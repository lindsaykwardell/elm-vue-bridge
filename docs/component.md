# Create a Component

Now that your application is configured to handle Elm code, let's import an Elm module into our app. Create a file called `Main.elm` at the root of your `src` folder, and put the following content in it:

```elm
module Main exposing (main)

import Browser
import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)

init = 0

type Msg = Increment | Decrement

update : Msg -> Int -> Int
update msg model =
  case msg of
    Increment ->
      model + 1

    Decrement ->
      model - 1

view model =
  div []
    [ button [ onClick Decrement ] [ text "-" ]
    , div [] [ text (String.fromInt model) ]
    , button [ onClick Increment ] [ text "+" ]
    ]

main = Browser.sandbox { init = init, update = update, view = view }
```

Now, in your `App.vue` file (or whichever Vue component you want to use), import our Elm module and the bridge, and do the following:

```vue
<script setup>
import elmBridge from 'elm-vue-bridge';
import { Elm } from './Main.elm';

// Create the component
const Counter = elmBridge(Elm);
</script>

<template>
  <!-- Use the component just like any Vue component! -->
  <Counter />
</template>
```