# Components

According to [the Vue documentation](https://v3.vuejs.org/guide/introduction.html#composing-with-components):

> The component system is another important concept in Vue, because it's an abstraction that allows us to build large-scale applications composed of small, self-contained, and often reusable components. If we think about it, almost any type of application interface can be abstracted into a tree of components.

Components are a core aspect of modern Javascript frameworks. The goal, as stated above, is to create reusable snippets of code that can be built together to form a tree. Components, like objects in an object-oriented language, often contain both state and methods that can be executed against that state. In addition, components create effects that can be listened to by parent components, or trigger side effects in global state management solutions like Vuex.