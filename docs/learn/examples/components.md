# Components

According to [the Vue documentation](https://v3.vuejs.org/guide/introduction.html#composing-with-components):

> The component system is another important concept in Vue, because it's an abstraction that allows us to build large-scale applications composed of small, self-contained, and often reusable components. If we think about it, almost any type of application interface can be abstracted into a tree of components.

Components are a core aspect of modern Javascript frameworks. The goal, as stated above, is to create reusable snippets of code that can be built together to form a tree. Components, like objects in an object-oriented language, often contain both state and methods that can be executed against that state. In addition, components create effects that can be listened to by parent components, or trigger side effects in global state management solutions like Vuex.

As Elm is a pure functional language, there is no concept of components within the Elm language. State always lives at the root of an Elm application, and is used to generate the UI (or view). The UI, in turn, causes events to be triggered, leading to updates to the state. This flow of data is referred to as [The Elm Architecture](https://guide.elm-lang.org/architecture/).

From the Elm docs, an Elm application typlically looks like this:

<div style="background: white; text-align: center;">

![Arrows flow in a circle from Elm to a PC monitor with the text "Html", and back to the Elm app with the text "Msg".](https://guide.elm-lang.org/architecture/buttons.svg)

</div>

When an Elm app is loaded, the state (or `model`) for the application is initialized, using an `init` function. This can be done either with flags (see [using flags](/guide/flags) in `elm-vue-bridge` for an example) or by setting a default value within Elm itself. A `view` function is then run, which renders HTML to the web page. If this page is interactive with the Elm app, messages can be sent back to Elm with information from the user (a button was clicked, data was entered into an input, etc). An `update` function is then called, receiving the message and the previous `model`. The update function uses the message type to determine what to do, then returns an updated model. The UI is then updated with the related changes.

Because an Elm app is always made up of these three core building blocks (`init`, `update`, `view`), a component-based architecture does not lend itself to fitting in The Elm Architecture. In fact, the creator of Elm, Evan Czaplicki, gave a talk in 2017 about how it's often preferable to not break an Elm app into separate files at all!

<div style="text-align: center">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/XpDsk374LDE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

This does not mean that abstractions across modules are discouraged, only that you as the developer should be aware of what you are doing, and why. If we step back from thinking of components as "building blocks", we can get back to the object-oriented concept of "state" and "methods". All Vue components either have local state or receive global state, and typically perform some sort of action on these values. While Elm does not have a concept of "components", we can break down our root functions (`init`, `view`, and `update`) into smaller bits of code, and hook them together.

A great example of this would be [`NoRedInk/noredink-ui`](https://package.elm-lang.org/packages/NoRedInk/noredink-ui/latest/), a publicly viewable library of UI widgets built using Elm. It is primarily a UI layer, and so it can be used with a `view` function to render common elements such as buttons or inputs. But all of these widgets are still, at the end of the day, pure functions, and are returning events that trigger calls to the `update` function.