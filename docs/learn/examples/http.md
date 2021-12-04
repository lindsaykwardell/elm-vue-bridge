<script setup>
  import HttpVue from '../../../../../.vuepress/components/HttpVue.vue'
  import HttpElm from '../../../../../.vuepress/components/HttpElm.vue'
</script>

# HTTP Request

A very common case when building client-side web applications is a need to make an HTTP request to a server or API. Both Javascript and Elm provide built-in ways to handle this. In Javascript, the browser provides access to the `fetch` API (or alternative libraries like `axios`). Elm's HTTP module is imported from `elm/http`, and must be installed as a dependency in your application.

## Overview

For this example, we will be using [{JSON} Placeholder](https://jsonplaceholder.typicode.com/)'s "Todo" API to post a new todo. A todo is an object with three keys: `id`, `title`, and `completed`. Our user will be able to enter a new todo, click a button to add the todo, and receive a response with the new todo object. Our UI should be able to display either the Todo object, or that an error occurred.

### Typescript / Javascript

#### Todo

Since we already know the type of data we will be working with, let's create a type for it (this can be skipped if you aren't using Typescript) and create a `ref` to hold the response.

```ts
type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const response = ref<null | Todo>(null);
```

This type is handy, but not super useful. We get some type safety in that TS will alert us to accessing its properties when it might be null, forcing us to create different cases depending on its state. If we had any functions that took a `Todo` as an argument, we could have the compiler alert us if we tried to pass in some other value. But remember that Typescript is only helping us at compile time, not runtime. In order to validate that our `response.value` object is what we think it is, we still need to write a custom validation function.

#### submitTodo

Often, when working with API requests, the state of the UI must be updated in order to handle the various stages of a request (has the request been made? Is it running? Was there an error?). An easy way to handle this is to create a `Status` enum which contains each state. Then, when the request is made, the state is updated to match the current status. For example:

```ts
enum Status {
  Idle,
  Running,
  Success,
  Failure,
}

function submitTodo() {
  // Set status to running
  status.value = Status.Running;

  fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: input.value,
      completed: false,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      // We have our data!
      // Set status to Success
      status.value = Status.Success;
      response.value = res;
    })
    .catch(() => {
      // Something went wrong!
      // Set status to Failure
      status.value = Status.Failure;
    });
}
```

Our UI can then correctly reflect this state to ensure we aren't showing anything that shouldn't be there, using `v-if` directives (such as disabling the submit button). This works pretty well for a basic example, but there are some potential issues.

Because our function is mutating the state of `status` and `response` as a side effect (as in, they were not passed in as arguments to the function), there is a chance that something else in our codebase could change them as well. We could handle this by using something like Vuex or another immutability library to better control our actions, but that does require another outside package.

We also need to keep track of the value in `response`. There are two issues here. First, in the above example, we aren't resetting `response` when we make a request. Do we want to be storing `response` after a new request has been made? Maybe, but probably not. Second, Javascript by default does no sort of data validation on what comes back from the API. Even with Typescript, we would need to manually verify that the data structure we're expecting is present. This could mean that our application will throw an error down the line due to faulty data, but the error could appear as `cannot read undefined from null`.

### Elm

#### Todo

Elm has its own method of creating custom types. In the case of our data structure here, we can create a type alias to handle it within Elm:

```elm
type alias Todo =
    { id : Int
    , title : String
    , completed : Bool
    }
```

This should look similar to the Typescript type we created above. However, Elm provides the additional benefit of its types working at runtime as well as compile time. During development, the Elm compiler can alert us to any errors we may have with our code. During runtime, we are still required to correctly parse the incoming data from the API into Elm data structures (no `res.json()` in Elm!).

To handle this, Elm provides a package for encoding and decoding JSON. There is another package created by NoRedInk that makes decoding JSON even easier, which is what we are using here:

```elm
decodeTodo : Decoder Todo
decodeTodo =
    Decode.succeed Todo
        |> Decode.required "id" Decode.int
        |> Decode.required "title" Decode.string
        |> Decode.required "completed" Decode.bool


encodeTodo : Todo -> Encode.Value
encodeTodo todo =
    Encode.object
        [ ( "id", Encode.int todo.id )
        , ( "title", Encode.string todo.title )
        , ( "completed", Encode.bool todo.completed )
        ]

```

`decodeTodo` is a function that creates a decoder from JSON into a `Todo`, while `encodeTodo` does the opposite. In this way, we are not just validating that our JSON is correct, we are either parsing it into the expected data type or throwing an error.

#### submitTodo

As in our Typescript example, we are storing the status of our app in a `Status` type (Elm doesn't have enums). However, because Elm's types can also hold data, we can store the returned `Todo` as part of the `Success` type.

```elm
type Status
    = Idle
    | Running
    | Success Todo
    | Failure
```

By doing this, we know for certain that our new `Todo` is only ever present when our app is in a success state. When we change to a `Running` or `Failure` mode, the stored `Todo` is automatically removed from state. This makes our code much simpler to manage and understand what is going on.

In regards to making an HTTP request, Elm has a major advantage in that all state is immutable, and side effects are impossible. In Elm, an HTTP request is a type of `Cmd`, part of the tuple that makes up the return from any given call to the `update` function. This means that an HTTP request is always triggered in response to a message coming in from the UI. Using a POST as our example, a request takes a record with three values: the URL, the body, and what to do with the response.

```elm
submitTodo : String -> Cmd Msg
submitTodo input =
    Http.post
        { url = "https://jsonplaceholder.typicode.com/todos"
        , body =
            Http.jsonBody
                (Encode.object
                    [ ( "title", Encode.string input )
                    , ( "completed", Encode.bool False )
                    ]
                )
        , expect = Http.expectJson GotResponse decodeTodo
        }

```

Rather than Javascript's model of promises, Elm handles the return of an HTTP request with an expected type of data, and what to do with it. In the above case, we are telling Elm to expect JSON as the response from our endpoint, then to send that data to our `update` function with a message of `GotResponse decodeTodo`. 

In our `update` function, we can safely handle each potential case from this request - either it will succeed or it will fail (no try/catch blocks!). Elm uses pattern matching to ensure that the correct case is called in our `update` function.

```elm
GotResponse (Result.Ok todo) ->
    ( { model | status = Success todo }
    , Cmd.none
    )

GotResponse (Result.Err _) ->
    ( { model | status = Failure }
    , Cmd.none
    )
```

In the case of success, our status is set to `Success todo` (the `todo` is our decoded JSON value). In the event something went wrong, we enter the error state. Because our app only sets the status to `Failure` when `GotResponse` includes an error, we can know for certain that if we are in an error state, something happened with the HTTP request.

## Code Example

<CodeGroup>
  <CodeGroupItem title="Vue">

```vue
<script setup lang="ts">
import { ref, computed } from "vue";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

enum Status {
  Idle,
  Running,
  Success,
  Failure,
}

const input = ref("");
const status = ref(Status.Idle);
const response = ref<null | Todo>(null);

const submitButtonText = computed(() => {
  switch (status.value) {
    case Status.Idle:
      return "Add Todo";
    case Status.Running:
      return "Adding...";
    case Status.Success:
      return "Added!";
    case Status.Failure:
      return "Failed!";
  }
});

const encodedTodo = computed(() => JSON.stringify(response.value));

function submitTodo() {
  status.value = Status.Running;
  response.value = null;
  fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: input.value,
      completed: false,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      status.value = Status.Success;

      if (!validateResponse(res)) {
        throw Error();
      }

      response.value = res;
    })
    .catch(() => {
      status.value = Status.Failure;
    });
}

function validateResponse(res: Todo) {
  return (
    typeof res.title === "string" &&
    typeof res.completed === "boolean" &&
    typeof res.id === "number"
  );
}
</script>

<template>
  <div>
    <input v-model="input" />
    <button :disabled="status === Status.Running" @click="submitTodo">
      {{ submitButtonText }}
    </button>
    <div>
      <template v-if="status === Status.Failure">Error</template>
      <template v-else-if="response === null">No response yet</template>
      <template v-else>{{ encodedTodo }}</template>
    </div>
  </div>
</template>


```

  <div style="float: right">
  
  [View on Github](https://github.com/lindsaykwardell/elm-vue-bridge/blob/main/src/Components/Examples/Http/Http.vue)
  
  </div>

  <HttpVue />

  </CodeGroupItem>

  <CodeGroupItem title="Elm">

```elm
module Components.Examples.Http.Main exposing (main)

import Browser
import Html exposing (Html, button, div, input, text)
import Html.Attributes exposing (disabled, value)
import Html.Events exposing (onClick, onInput)
import Http
import Json.Decode as Decode exposing (Decoder)
import Json.Decode.Pipeline as Decode
import Json.Encode as Encode


type alias Model =
    { input : String
    , status : Status
    }


type Msg
    = InputText String
    | SubmitTodo
    | GotResponse (Result Http.Error Todo)


type alias Todo =
    { id : Int
    , title : String
    , completed : Bool
    }


type Status
    = Idle
    | Running
    | Success Todo
    | Failure


decodeTodo : Decoder Todo
decodeTodo =
    Decode.succeed Todo
        |> Decode.required "id" Decode.int
        |> Decode.required "title" Decode.string
        |> Decode.required "completed" Decode.bool


encodeTodo : Todo -> Encode.Value
encodeTodo todo =
    Encode.object
        [ ( "id", Encode.int todo.id )
        , ( "title", Encode.string todo.title )
        , ( "completed", Encode.bool todo.completed )
        ]


main : Program () Model Msg
main =
    Browser.element
        { init = \_ -> init
        , update = update
        , view = view
        , subscriptions = \_ -> Sub.none
        }


init : ( Model, Cmd Msg )
init =
    ( { input = ""
      , status = Idle
      }
    , Cmd.none
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        InputText input ->
            ( { model | input = input }, Cmd.none )

        SubmitTodo ->
            ( { model | status = Running }, submitTodo model.input )

        GotResponse (Result.Ok todo) ->
            ( { model | status = Success todo }
            , Cmd.none
            )

        GotResponse (Result.Err _) ->
            ( { model | status = Failure }
            , Cmd.none
            )


view : Model -> Html Msg
view model =
    div []
        [ input [ value model.input, onInput <| InputText ] []
        , button
            [ disabled <| model.status == Running
            , onClick SubmitTodo
            ]
            [ text <| submitButtonText model.status ]
        , div []
            [ case model.status of
                Success todo ->
                    encodeTodo todo |> Encode.encode 4 |> text

                Running ->
                    text <| "No response yet"

                Idle ->
                    text <| "No response yet"

                Failure ->
                    text <| "Error"
            ]
        ]


submitButtonText : Status -> String
submitButtonText status =
    case status of
        Idle ->
            "Add Todo"

        Running ->
            "Adding..."

        Success _ ->
            "Added!"

        Failure ->
            "Failed!"


submitTodo : String -> Cmd Msg
submitTodo input =
    Http.post
        { url = "https://jsonplaceholder.typicode.com/todos"
        , body =
            Http.jsonBody
                (Encode.object
                    [ ( "title", Encode.string input )
                    , ( "completed", Encode.bool False )
                    ]
                )
        , expect = Http.expectJson GotResponse decodeTodo
        }

```

  <div style="float: right">
  
  [View on Github](https://github.com/lindsaykwardell/elm-vue-bridge/blob/main/src/Components/Examples/Http/Main.elm)
  
  </div>

  <HttpElm />

  </CodeGroupItem>
</CodeGroup>
