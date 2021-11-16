<script setup>
  import HttpVue from '../../../../../.vuepress/components/HttpVue.vue'
  import HttpElm from '../../../../../.vuepress/components/HttpElm.vue'
</script>

# HTTP Request

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
      <template v-if="response === null">No response yet</template>
      <template v-else>{{ encodedTodo }}</template>
    </div>
  </div>
</template>

```

  <HttpVue />

  </CodeGroupItem>

  <CodeGroupItem title="Elm">

```elm
module Main exposing (main)

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
    , response : Maybe Todo
    }


type alias Todo =
    { id : Int
    , title : String
    , completed : Bool
    }


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


type Msg
    = InputText String
    | SubmitTodo
    | GotResponse (Result Http.Error Todo)



-- | GotPosts (Result Http.Error (List Post))


type Status
    = Idle
    | Running
    | Success
    | Failure


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
      , response = Nothing
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
            ( { model | status = Success, response = Just todo }
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
            [ case model.response of
                Nothing ->
                    text <| "No response yet"

                Just todo ->
                    encodeTodo todo |> Encode.encode 4 |> text
            ]
        ]


submitButtonText : Status -> String
submitButtonText status =
    case status of
        Idle ->
            "Add Todo"

        Running ->
            "Adding..."

        Success ->
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

  <HttpElm />

  </CodeGroupItem>
</CodeGroup>