# Why Elm?

## Why Change?

When thinking about adopting a new language or framework, the first question that often comes to mind is, "but why?" I think there are many reasons that web developers try out new frameworks. We can see those developers who want to be at the bleeding edge of the Javascript ecosystem, trying out new frameworks as they release (or often before, during open betas). We can see those who have used a framework (such as React or Vue) for some time, have grown accustomed to it, but want to see what's going on outside their typical sphere of knowledge. We also see those who have become less interested in the framework churn, and just want to get work done with the best tool for the job.

All of these are valid reasons to try out something new. Learning a new programming language or framework can provide new perspective on solving complex problems, managing common cases like state management or error handling. As someone who spent a good chunk of time early in her career rebuilding the same project in multiple frameworks, I personally recognize the appeal of this approach to learning.

This article is intended to answer the second question: "but why Elm?" That one can be trickier, especially for Javascript developers. Learning a framework has obvious benefits; learning multiple frameworks leads to a deeper understanding of the ecosystem at large, and overall best patterns to handle web applications. Why learn a different language for web development, when the language native to the web is already available to you?

The [official Elm site](https://elm-lang.org/) describes Elm as, "A delightful language for reliable web applications." This simple statement is a great summation of what the Elm programming language offers to developers. At a language level, Elm strives to provide an exceptional developer experience, guiding developers in the direction of building applications that are more maintainable and resiliant. It does this through a number of small things that, when put together, make something truly special in the web development ecosystem.

Let's explore these two points in a bit more detail.

## Reliable Web Applications

When building a web application, our first goal should be to deliver a reliable experience to end users. Elm takes this goal, and provides the tools an guarantees to accomplish it.

### Functional Programming

Elm is a purely functional programming language. This means two things. First, a function that is called with given arguments will always return the same result. Functions do not have access to any state that is not passed into them, which makes our functions more reliable. We don't need to worry about different parts of the codebase interacting in a strange way, because they cannot see each other.

Second, unlike Javascript, there can be no side effects from our function calls. Because Elm restricts the scope of a function to its arguments, the only effect that the function can have is on its return value. This prevents functions from altering the state of our application in unpredictable ways, and provides a strong guarantee that our code is doing what we expect.

Let's use a common example for a Vue component of a login field:

```vue
<script setup lang="ts">
import { ref } from 'vue';
import api from 'useApi'; // Mocked API for example

const username = ref("");
const password = ref("");

function login() {
  api.login(username.value, password.value).then(res => {...});
}
</script>

<template>
  <form @submit.prevent="login">
    <label>
      Username
      <input v-model="username">
    </label>
    <label>
      Password
      <input type="password" v-model="password">
    </label>
    <button>Log in</button>
  </form>
</template>
```

This is a fairly common scenario in Vue. We have some sort of data values, and we have functions that are triggered by events in the DOM. These functions can access and mutate state outside of the arguments they received. While this example is fairly simplistic, it's not hard to imagine a scenario where functions are accessing state outside of their own scope and manipulating that data. Elm prevents this kind of behavior and code at a language level, ensuring that these issues do not come up.

None of this is to say that Elm doesn't cause effects from its functions, just that it doesn't cause side effects. One function can lead to calling another, which leads to calling another. But each of those function calls is intentional, the arguments and returns are properly handled, and nothing is happening in our application that we didn't explicitly intend.

### Type System

Elm has a strong type system designed around ensuring that your functions and state are always valid. Elm code can be statically analyzed, which means that the compiler can determine the types of your functions and values, but it also provides for declaring your types manually. It then uses those types to validate that your code will always return the expected value, and that no edge cases get ignored. For example, if you have a switch statement in Javascript, you don't need to fill out every possible case (and, depending on the switch, that may be impossible anyway!). Elm requires that every possible situation be covered.

Elm's type system ensures that the data you are expecting is the correct type, both during development and in production. Unlike Typescript, which provides some type safety to Javascript applications, Elm's types are still enforced during runtime, preventing the wrong data from ever entering your application.

### No Runtime Exceptions

Due to the guarantees of the type system and the functional nature of the language, Elm almost never has runtime exceptions. When an Elm application is deployed, you can expect it to do what it should be doing, rather than stressing that you missed an edge case or someone is going to cause the app to crash.

Elm also has no concept of `null` in the language. Null values (and undefined in Javascript) can lead to uncertainty about what state your application is in, and make missing data always a possibility. From [the Elm guide](https://guide.elm-lang.org/error_handling/maybe.html):

> Elm avoids these problems by not having null references at all. We instead use custom types like Maybe to make failure explicit. This way there are never any surprises. A String is always a String, and when you see a Maybe String, the compiler will ensure that both variants are accounted for. This way you get the same flexibility, but without the surprise crashes.

## A delightful language

One of the things that most caught my attention when starting with Elm was how nice it felt to work with. I would often find myself starting to use its syntax, or wishing I could do things in the way that Elm is structured, rather than continue to use the Javascript approach. The reliability it provided, plus the developer experience, has made Elm the language I turn to for any long-term side project (my longest lasting side project was started over two years ago, and I can still do a complete refactor of it with confidence that I'm not breaking something or missing a change).

### Helpful Compiler

We've all seen compiler errors, but you don't always see compiler errors that are actually helpful. Errors in Elm are handled in an instructive way, rather than throwing error codes or stating something that isn't useful. Trying to call a function with the wrong type? Elm will tell you that. Attempting to do something in a more Javascript-like way, such as truthiness? Elm will let you know that you must be explicit. Depending on the error, it will even link out to the documentation for a given package, or to the official Elm guide.

Here's a couple examples:

#### Incorrect Argument Type

This is a common case where the wrong type of input is being given to a function (in this case, a string instead of an integer). Elm warns you of the problem, but also suggests the solution: using `String.toInt`. Obviously that would not actually produce an integer in this case, but Elm's type system handles that. The return of `String.fromInt` is a `Maybe Int`, which would need to be checked explicitly to determine that an integer has been created.

```
The 1st argument to `fromInt` is not what I expect:
    String.fromInt "Not an int"
                    ^^^^^^^^^^^^
This argument is a string of type:

    String

But `fromInt` needs the 1st argument to be:

    Int

Hint: Want to convert a String into an Int? Use the String.toInt function!
```

#### Invalid Case

In Elm, functions must always return the same type. This is also true for case statements (think `switch` in Javascript) and if-statements. If a given statement is not returning the correct type, Elm will warn you, explain why it is warning you, link to the documentation, *and* potentially give a suggestion if it knows what you could try.

```
The 3rd branch of this `if` does not match all the previous branches:

     if n < 0 then
       "negative"
     else if n > 0 then
       "positive"
     else
       0
       ^
The 3rd branch is a number of type:

    number

But all the previous branches result in:

    String

Hint: All branches in an `if` must produce the same type of values. This way, no
matter which branch we take, the result is always a consistent shape. Read
<https://elm-lang.org/0.19.1/custom-types> to learn how to “mix” types.

Hint: Try using String.fromInt to convert it to a string?
```

#### Truthiness

In Elm, if you want to know whether something is true, you must test for it explicitly. This is not the case in Javascript, which has a concept of truthiness. Since many new Elm developers are coming from Javascript, the compiler is built-in with an explanation about having to explicitly check for true or false values.

```
This `if` condition does not evaluate to a boolean value, True or False.

     if String.length "Elm + Vue = ❤️" then
       "Hooray!"
     else
       "Still Hooray!"

This `length` call produces:

    Int

But I need this `if` condition to be a Bool value.

Hint: Elm does not have “truthiness” such that ints and strings and lists are
automatically converted to booleans. Do that conversion explicitly!
```

### No Javascript Churn

One of the truths of modern Javascript development is that the recommended tools are always changing. Over the last year, the Vue ecosystem has gone through its own shift - Vue 3, `<script setup>`, Composition API, Pinia instead of Vuex, Vite over Webpack, and more change in the library ecosystem as well. Change can be a good thing! But it can also be exhausting.

Elm, and by extension the Elm ecosystem, is very stable in comparison. On top of that, the tools to build Elm applications are typically part of the core language library, rather than third-party (with a couple exceptions). By adopting Elm, you can be pretty sure that the code you write today won't go out of style by the end of the year.

#### Package Management

In Javascript, we have three typical options for package management: npm, yarn, and pnpm. In addition, packages can be imported from resources like Unpkg, or directly from Github (such as in Deno). All of these are third-party tools and resources hosting code, which have been adopted by the JS community.

Elm has its own package management system, outside of NPM or Github. All Elm packages are hosted on https://package.elm-lang.org/, and can be installed by using `elm install`.

#### Framework

Looking purely at Vue, the framework has gone through a number of updates recently. Vue 3 released over a year ago, with two minor versions since. The recommended patterns for building with Vue have also changed over that time. In addition, frameworks built on top of Vue (such as Gridsome, Quasar, and Nuxt) have all gone through their own churn and changes.

Elm practically doesn't have frameworks. There are some framework-style libraries (such as Elm Pages or Elm SPA) that can be beneficial, but they are more the exception than the rule. All Elm applications follow The Elm Architecture, which is a pattern for building applications that has been baked into the language, removing much of the need for framework code.

#### Global State Management

In Vue today, we are seeing a rise in the number of state management libraries. Established tools like Vuex and Pinia are constantly evolving, while newcomers like Harlem are also working to improve the situation in state management.

Because of Elm's functional nature, there is only global state, and the language lends itself to managing it well. In fact, Elm is the inspiration for libraries like Redux. All state is managed at a global scope, and updates to that state return immutable values.

#### Immutability

Speaking of immutability, it's often desireable in large applications to be able to pass readonly values from global state into local portions of the code. However, even with tools like Vuex, global state can be accidentally mutated if developers are not careful, and no errors will be thrown by Vue or Vuex when that happens.

Elm removes this issue entirely, as all state is immutable. Functions that alter the state of an object or record must return a new record with updated values, rather than altering the existing object. This removes concerns about accidental mutations altogether, allowing for more confidence that state is not changing when it's not expected.

#### Type System

Vue 3 has gone to great lengths to adopt Typescript, and provide type safety to Vue applications. It's trivial to enable Typescript in a Vue component, and with updates made to Pinia and Vuex it's easier than ever to correctly type global state. However, Typescript's type system is not perfectly sound, and has a number of escape hatches (in order to enable compatibility with Javascript). Typescript also does not validate the incoming type of API responses, or potentially altered data structures, meaning that the type system is only useful during development.

Elm's type system allows a codebase to be statically analyzed, ensuring that all types are exactly what they should be. Elm code does not compile if the types are not aligned with what they should be. Any data flowing into an Elm application must also be parsed into Elm types, preventing the wrong data from ever entering the application (even during runtime).

#### Build Tools

Javascript today has a number of build tools and bundlers - Webpack, Rollup, Parcel, esbuild, and more. This is a very exciting space for frontend development! Elm, as a compile-to-JS language, has plenty of interoperability with these tools, but in addition comes with its own build tool and development environment. There's no need for extra tooling beyond Elm itself if you don't want or need it.

#### Linting and Formatting

A more recent addition to Javascript tooling is Prettier, the code formatting tool. This tool ensures that JS code looks the same across a codebase, which is a huge benefit when multiple developers are working on the same code. This can be an issue since Javascript can be written in any way the developer chooses, as long as it is syntactically correct (Should we use tabs, or spaces? How many spaces?). Linting is also especially helpful, validating your code and finding small errors or technical debt you may not be aware of.

Elm provides a guideline for how all Elm code should be structured, removing the bikeshedding discussions altogether. A community tool called [elm-format](https://github.com/avh4/elm-format) provides automatic code formatting, removing the need to manually format your code to match this format. For linting, [elm-review](https://package.elm-lang.org/packages/jfmengels/elm-review/latest/) is a tool that serves a similar purpose, ensuring that all code matches a standard level of quality.

#### Testing

There are numerous testing framework in the Javascript ecosystem. For unit tests, there's Mocha, Chai, Jasmine, and Jest are the more common ones, with smaller projects like uvu also available. These frameworks then need to be configured to integrate properly into your project - ensure Typescript is working properly between them, integrate the Vue Test Utils (and potentially testing-library).

Elm has one solution for unit testing - [elm-test](https://github.com/elm-explorations/test). It provides all the required functionality to test and validate Elm code from a unit test perspective.

Because Elm compiles to JS, and is used in the browser, it's also pretty straightforward to enable testing with Cypress (including Cypress Component Testing, if you're integrating with Vue!).


### Enforced Semantic Versioning

Because of Elm's strong type system and its first-party package ecosystem, Elm is also able to enforce semantic versioning on any packages released to the public. Conversely, versioning in Javascript is fully up to the developer. Want to make breaking changes to your API? Go for it, but let's call that a patch instead of a major release. Only have minor updates but want to bump the major or minor version? Sure, that's fine too! While many developers are disciplined enough not to make these kinds of changes, it is still a constant that it could happen, leading to issues when updating node modules.

Elm's enforcement of semantic versioning helps both the package developer as well as the package consumers. If a major version is released, you can know for certain that there are breaking changes. Likewise, a minor update can be known to add functionality, but will remain compatible with your existing setup.

## Try it out!

None of the above is to say, "Elm is better, stop using Vue/JS/whatever!" Vue is still my JS framework of choice, and I'm very happy when I get to use it. However, I have found in my experience that Elm allows me to write more resiliant code, that I am more capable of maintaining and refactoring, and I can be more certain that functionality is what I expect it to be with every release. Of all my side projects, the one that is the oldest and most complex is written in Elm. All others are either small, or abandoned. 

If you made it this far, and are still interested in giving Elm a shot, I highly recommend it.

Curious about what incremental adoption of Elm could look like for your business? Watch this presentation by Richard Feldman about how he introduced Elm at NoRedInk:

<div style="text-align: center">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/5CYeZ2kEiOI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Learning Resources

Here's a few of the resources I've used to learn Elm:

### Guides
- [The Official Elm Guide](https://guide.elm-lang.org/)
- [Beginning Elm](https://elmprogramming.com/)
- [Elm In Action](https://www.manning.com/books/elm-in-action)

### Podcasts
- [Elm Radio](https://elm-radio.com/)
- [Elm Town (not currently recording new episodes)](https://elmtown.simplecast.com/)
- [Modern Web Podcast - Elm with Richard Feldman](https://modernweb.podbean.com/e/s08e014-modern-web-podcast-elm-with-richard-feldman/)

### Community
- [Elm Slack Community](https://elmlang.herokuapp.com/)

<style>
  table {
    text-align: center;
  }
  td {
    width: 50%;
  }
</style>
