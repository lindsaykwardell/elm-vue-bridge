<script setup>
  import ComponentElm from '../../../../../.vuepress/components/ComponentElm.vue'
</script>

# Components

## Components in Vue

According to [the Vue documentation](https://v3.vuejs.org/guide/introduction.html#composing-with-components):

> The component system is another important concept in Vue, because it's an abstraction that allows us to build large-scale applications composed of small, self-contained, and often reusable components. If we think about it, almost any type of application interface can be abstracted into a tree of components.

Components are a core aspect of modern Javascript frameworks. The goal, as stated above, is to create reusable snippets of code that can be built together to form a tree. Components, like objects in an object-oriented language, often contain both state and methods that can be executed against that state. In addition, components create effects that can be listened to by parent components, or trigger side effects in global state management solutions like Vuex.

Components can range from complex to simple in nature. Component libraries (such as [Vuetify](https://vuetifyjs.com/en/) or [Inkline](https://inkline.io/)) often provide basic components, such as inputs, dropdowns, or modals, while more complex components are typically designed for the specific application they are a part of. These components work hand in hand to construct a complete user interface.

Most components that are interactve either contain state (or receive it from higher up in the tree), emit events, or both. A typical input component, for example, may receive a value as a prop (data passed from its parent) and emit an input event when that value is updated in the browser. We could see something like the below as an example input component:

```vue
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  }
})
</script>

<template>
  <label>
    {{ props.label }}
    <input v-model="value">
  </label>
</template>
```

This component does the following:

- Defines its props as `modelValue` (a string with a default empty string) and `label` (same as `modelValue`).
- Defines its emits (the events it can create) as `update:modelValue`. (For details on how `v-model` works in Vue 3, read the [migration documentation](https://v3.vuejs.org/guide/migration/v-model.html) for `v-model`).
- Creates a computed property `value`, which returns `props.modelValue` when accessed and emits an update event when set.
- Defines a template to render the input and its label.

Then, in our Vue application, we can utilize this component like this:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import Input from '~/components/Input.vue';

const value = ref('');
</script>

<template>
  <Input v-model="value" label="Name" />
</template>
```

## Components in Elm

As Elm is a purely functional language, there is no concept of components as displayed above. Components in Vue and React can be compared to object-oriented programming, in which both state and methods are co-located in classes or modules. In Elm, all state is managed at the top of the application (often referred to as the `model`), and then passed down through functions as needed to render the UI. Similarly, all events must reach this top level as well, centralizing all updates to our model into a single `update` function. This organization pattern is referred to as [The Elm Architecture](https://guide.elm-lang.org/architecture/).

However, this does not mean that we cannot create reusable modules of code! Let's take a step back from the term "component", and think about its base again. A typical component:

- Initializes state
- Handles events
- Renders UI elements

All of this can still be done within Elm, and leads to a greater reusability of code. In addition, because Elm is constructed of function calls invoking other function calls, we still generate the same kind of tree structure that is described in the Vue documentation.

Lets take our input component from above, and try to recreate it in Elm. Keeping in mind the three key aspects of a component from above, we could create an Elm module that represents an input like this:

```elm
module Components.Examples.Component.Input exposing
    ( Config
    , InputState
    , Msg(..)
    , init
    , view
    )

import Html exposing (Html, input, label, text)
import Html.Attributes exposing (value)
import Html.Events exposing (onInput)


type alias Config msg =
    { modelValue : InputState
    , labelText : String
    , onInput : Msg -> msg
    }


type Msg
    = UpdateValue InputState


type InputState
    = InputState String


init : InputState
init =
    InputState ""


view : Config msg -> Html msg
view config =
    case config.modelValue of
        InputState state ->
            label []
                [ text config.labelText
                , input
                    [ value state
                    , onInput
                        (\input ->
                            UpdateValue
                                (InputState input)
                                |> config.onInput
                        )
                    ]
                    []
                ]

```

This module performs a similar role to our Vue component. All the code for initializing input state, viewing the input, and handling what messages it can create is centralized in one module. This allows the Input module to be reused across our codebase as needed, and any changes we need to make to it can be done in one file. This is exactly the pattern utilized in building components for Vue or React.

The state of the input (`InputState String`) uses a type that is only utilized within the module, ensuring that our state is managed from a single location despite being stored globally. This is referred to as an opaque type, and allows our module to be updated without having to alter the code that utilizes it. This also mirrors how components are built, since internal state and methods for a component should not cause frequent API changes for parent components.

Now, let's look at how we might build an Elm app that uses this module.

```elm
module Components.Examples.Component.Main exposing (main)

import Browser
import Components.Examples.Component.Input as Input exposing (InputState)
import Html exposing (Html, div)


type alias Model =
    { value : InputState
    }


init : Model
init =
    { value = Input.init
    }


type Msg
    = UpdateValue InputState


update : Msg -> Model -> Model
update msg model =
    case msg of
        UpdateValue value ->
            { model
                | value = value
            }


view : Model -> Html Msg
view model =
    div []
        [ Input.view
            { modelValue = model.value
            , labelText = "Name"
            , onInput = \(Input.UpdateValue value) -> UpdateValue value
            }
        ]


main : Program () Model Msg
main =
    Browser.sandbox { init = init, update = update, view = view }

```

<div style="padding: 15px 0;">
  <ComponentElm />
</div>

This is a fairly standard Elm app, but notice how we're using the Input's methods here. We describe our Model as having `{ value : InputValue }`, which means that we know it's an input value, but we don't know (or need to know) what data is actually stored there. We initialize this by using `Input.init`, setting the initial value of our state. Then, in our view, we utilize `Input.view` to render the UI for the input, passing in the required config. When our `onInput` function is called, it receives the updated `InputState` and sends that to our `update` function as a message.

This input element may not be very powerful, but it is a good example of how modules can be built as reusable code and put together into a tree, which is the same goal as components. The benefit of using The Elm Architecture is the same as using global state management like Redux or Vuex: all of our state is in one location, all updates to that state are pure (no side effects), and it is very clear what is triggering a given update.

While reusable modules can trigger updates to state, they can't update the state itself. That is still the responsibility of the `update` function. We could, however, add an `update` function to our Input that is called whenever we receive a message from the Input. It could look something like this:

```elm
type Msg
    = GotInputMsg Input.Msg


update : Msg -> Model -> Model
update msg model =
    case msg of
        GotInputMsg inputMsg ->
            { model
                | value = Input.update model.modelValue inputMsg
            }
```

In this way, we are passing responsibility for the changes back to the Input module, but maintaining that all changes must pass through our global `update` function.

A great example of reusable Elm modules for UI would be [`NoRedInk/noredink-ui`](https://package.elm-lang.org/packages/NoRedInk/noredink-ui/latest/), a publicly viewable library of UI widgets built using Elm. It is primarily a UI layer, and so it can be used with a `view` function to render common elements such as buttons or inputs. But all of these widgets are still, at the end of the day, pure functions, and are returning events that trigger calls to the `update` function.

<div style="text-align: center">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/XpDsk374LDE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
