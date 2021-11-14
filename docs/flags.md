# Flags

From [the Elm docs](https://guide.elm-lang.org/interop/flags.html):

> Flags are a way to pass values into Elm on initialization.
> 
> Common uses are passing in API keys, environment variables, and user data. This can be handy if you generate the HTML dynamically. They can also help us load cached information in this localStorage example.

In `elm-vue-bridge`, flags are a component prop. The prop takes any data type, but Elm will throw an error if the provided flag is not the expected type. Below is a simple Elm counter module that utilizes a flag to set the initial count.

```elm
module WithFlags exposing (main)

import Browser
import Html exposing (button, div, text)
import Html.Events exposing (onClick)


init initialValue =
    ( initialValue, Cmd.none )


type Msg
    = Increment
    | Decrement


update : Msg -> Int -> ( Int, Cmd Msg )
update msg model =
    case msg of
        Increment ->
            ( model + 1, Cmd.none )

        Decrement ->
            ( model - 1, Cmd.none )


view model =
    div []
        [ button [ onClick Decrement ] [ text "-" ]
        , div [] [ text (String.fromInt model) ]
        , button [ onClick Increment ] [ text "+" ]
        ]


main =
    Browser.element { init = init, update = update, view = view, subscriptions = \_ -> Sub.none }
```

In our Vue component, we then import and create the component as before. We also pass the initial value for Elm in as the `:flags` prop.

```vue
<script setup>
import elmBridge from 'elm-vue-bridge';
import { Elm } from './WithFlags.elm';

// Create the component
const WithFlags = elmBridge(Elm);
</script>

<template>
  <!-- Use the component just like any Vue component! -->
  <WithFlags :flags="2" />
</template>
```
