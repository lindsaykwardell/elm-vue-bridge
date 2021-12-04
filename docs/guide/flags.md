<script setup>
  import CounterWithFlags from '../../../../.vuepress/components/CounterWithFlags.vue'
</script>

# Flags

## What are Flags?

From [the Elm docs](https://guide.elm-lang.org/interop/flags.html):

> Flags are a way to pass values into Elm on initialization.
> 
> Common uses are passing in API keys, environment variables, and user data. This can be handy if you generate the HTML dynamically. They can also help us load cached information in this localStorage example.

In `elm-vue-bridge`, flags are a component prop. The prop takes any data type, but Elm will throw an error if the provided flag is not the expected type. If a flag is expect in Elm, it must be passed into the Vue component.

## Add flag to Elm

Let's update our Elm counter module to accept a flag. Update your `Main.elm` to the following:

```elm
module Main exposing (main)

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

## Add the flags prop

In our Vue component, we then import and create the component as before. We also pass the initial value for Elm in as the `:flags` prop.

```vue
<script setup>
import elmBridge from 'elm-vue-bridge';
import { Elm } from './Main.elm';

const Counter = elmBridge(Elm);
</script>

<template>
  <Counter :flags="2" />
</template>
```

## Example

<CounterWithFlags />

