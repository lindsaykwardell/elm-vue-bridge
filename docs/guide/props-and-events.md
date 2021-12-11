<script setup>
  import CounterWithProps from '../../../../.vuepress/components/CounterWithProps.vue'
</script>

# Props and Events

If you are more familiar with Vue's syntax for props and listening to events, having two values (flags and ports) may be a bit awkward. While this is the terminology and syntax used by Elm, it may be more comfortable to use a more Vue-centric syntax when integrating with an existing app.

`elm-vue-bridge` provides an additional way to generate Vue components that support Vue standard props and emits. Rather than pass values into `flags` or `ports`, you can define a custom props and emits definition.

One caveat: Whatever props you want to pass into your Elm component will be constructed into an object. This data structure *must* be represented in your Elm code in the exact same data structure, or Elm will throw an error that the provided flags do not match the expected type.

## Elm code

Let's update our Elm code to the below. For this functionality to work, we are updating our `init` function to take a record, `Flags`, which has an `initialValue : Int`.

We're also adding an additional port, `updateProps`. This port is used by the Vue component (if present in your Elm code) whenever your props values change. It will pass in the latest version of the object into Elm, where you can then handle updating your Elm model as needed.

```elm {8-10,24,54-59}
port module Main exposing (main)

import Browser
import Html exposing (button, div, text)
import Html.Events exposing (onClick)


type alias Flags =
    { initialValue : Int
    }


init : Flags -> ( Int, Cmd Msg )
init { initialValue } =
    ( initialValue, Cmd.none )


port sendCount : Int -> Cmd msg


port receiveCount : (Int -> msg) -> Sub msg


port updateProps : (Flags -> msg) -> Sub msg


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
            ( value, sendCount value )


view model =
    div []
        [ button [ onClick Decrement ] [ text "-" ]
        , div [] [ text (String.fromInt model) ]
        , button [ onClick Increment ] [ text "+" ]
        ]


subscriptions : Int -> Sub Msg
subscriptions _ =
    Sub.batch
        [ receiveCount Set
        , updateProps (\flags -> Set flags.initialValue)
        ]


main =
    Browser.element { init = init, update = update, view = view, subscriptions = subscriptions }
```

## Register custom Vue props and emits

Let's register our Vue component. Rather than just passing in the imported Elm module, we are going to provide an object. This object has three values:

- `name`: The name for the component.
- `emit`: An array of strings, in order to register what custom events this component makes. All provided emits will be mapped to matching ports from Elm, so when a port is triggered in Elm, the event will be generated in Vue.
- `props`: This is the standard Vue props. Define your props as you normally would.

Internally, the `emit` and `props` will be converted to a mixin, and applied to the custom Vue component. With that, we can now pass in props and bind to events as we would with any normal Vue component!

```vue {5-21,25-32}
<script setup>
import elmBridge from 'elm-vue-bridge';
import { Elm } from './Main.elm';

const Counter = elmBridge(Elm, {
  name: "Counter",
  emit: ["sendCount"],
  props: {
    initialValue: {
      type: Number,
      default: 2,
    },
  },
});

const value = ref(3);

function sendCount(val: number) {
  value.value = val;
  console.log(val);
}
</script>

<template>
  <Counter :initialValue="value" @sendCount="sendCount" />

  Buttons in Vue (current value: 5):

  <p>
    <button @click="value++">+</button>
    <button @click="value--">-</button>
  </p>
</template>
```

## Example

<CounterWithProps />
