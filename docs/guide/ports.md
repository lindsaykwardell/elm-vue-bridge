<script setup>
  import CounterWithPorts from '../../../../.vuepress/components/CounterWithPorts.vue'
</script>

# Ports

## What are Ports?

From [the Elm docs](https://guide.elm-lang.org/interop/ports.html):

> Ports allow communication between Elm and JavaScript.
>
> Ports are probably most commonly used for WebSockets and localStorage.

They're also great for communicating with a Vue app! For example, if props to our Vue component change, we need a way to communicate that to Elm so that the correct value is stored in Elm's model.

In `elm-vue-bridge`, the `ports` prop takes a function. This function receives an object with all the ports provided by Elm, which can then be subscribed to or used to send messages. 

## Add ports to Elm

Let's look at a basic example of using ports with `elm-vue-bridge`. First, update your `Main.elm` to the below:

```elm
port module Main exposing (main)

import Browser
import Html exposing (button, div, text)
import Html.Events exposing (onClick)


init initialValue =
    ( initialValue, Cmd.none )


port sendCount : Int -> Cmd msg


port receiveCount : (Int -> msg) -> Sub msg


type Msg
    = Increment
    | Decrement
    | Set Int


update : Msg -> Int -> ( Int, Cmd Msg )
update msg model =
    case msg of
        Increment ->
            ( model + 1, sendCount (model + 1) )

        Decrement ->
            ( model - 1, sendCount (model - 1) )

        Set value ->
            ( value, Cmd.none )


view model =
    div []
        [ button [ onClick Decrement ] [ text "-" ]
        , div [] [ text (String.fromInt model) ]
        , button [ onClick Increment ] [ text "+" ]
        ]


subscriptions : Int -> Sub Msg
subscriptions _ =
    receiveCount Set


main =
    Browser.element { init = init, update = update, view = view, subscriptions = subscriptions }
```

## Utilize ports in Vue

Now, in our Vue component, we can both subscribe to and send messages to Elm. If you're unfamiliar with the syntax, check out Elm's documentation on "Outgoing Messages" and "Incoming Messages".

```vue
<script setup>
import { ref } from "vue";
import { Elm } from "./Main.elm";
import elmBridge from "./lib";

const Counter = elmBridge(Elm);
const counter = ref(2);

function ports(ports) {
  ports.receiveCount.send(counter.value);

  ports.sendCount.subscribe((count) => {
    console.log(count);
    counter.value = count;
  });
}
</script>

<template>
  <CounterWithPorts :flags="0" :ports="ports" />
  The value in Vue is: {{ counter }}
</template>

```



## Example

<CounterWithPorts />