# Ports

From [the Elm docs](https://guide.elm-lang.org/interop/ports.html):

> Ports allow communication between Elm and JavaScript.
>
> Ports are probably most commonly used for WebSockets and localStorage.

They're also great for communicating with a Vue app! For example, if props to our Vue component change, we need a way to communicate that to Elm so that the correct value is stored in Elm's model.

In `elm-vue-bridge`, the `ports` prop takes a function. This function receives an object with all the ports provided by Elm, which can then be subscribed to or used to send messages. 

Let's look at a basic example of using ports with `elm-vue-bridge`. First, here's an example Elm module:

```elm
port module WithPorts exposing (main)

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

Now, in our Vue component, we can both subscribe to and send messages to Elm. If you're unfamiliar with the syntax, check out Elm's documentation on "Outgoing Messages" and "Incoming Messages".

```vue
<script setup>
import { Elm } from "./WithPorts.elm";
import elmBridge from "./lib";

const WithPorts = elmBridge(Elm);

function ports(ports) {
  ports.receiveCount.send(2);

  ports.sendCount.subscribe((count) => {
    console.log(count);
  });
}
</script>

<template>
  <WithPorts :flags="0" :ports="ports" />
</template>
```

## Example

<CounterWithPorts />

<script setup>
  import CounterWithPorts from '../../../.vuepress/components/CounterWithPorts.vue'
</script>