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

Elm also has no concept of `null` in the language. Null values (and undefined in Javascript) can lead to uncertainty about what state your application is in, and make missing data always a possibility. From [the Elm guide](https://guide.elm-lang.org/error_handling/maybe.html):

> Elm avoids these problems by not having null references at all. We instead use custom types like Maybe to make failure explicit. This way there are never any surprises. A String is always a String, and when you see a Maybe String, the compiler will ensure that both variants are accounted for. This way you get the same flexibility, but without the surprise crashes.

### No Runtime Exceptions

Due to the guarantees of the type system and the functional nature of the language, Elm almost never has runtime exceptions. When an Elm application is deployed, you can expect it to do what it should be doing, rather than stressing that you missed an edge case or someone is going to cause the app to crash.

Referring to the type system again, let's say that an API your application uses suddenly changed its data structure. Because Elm requires that all cases be accounted for, and also requires that JSON be properly parsed into the Elm type system, your application will gracefully shift to its error state, rather than simply throwing a `cannot read undefined of null` error in the console.

## A delightful language

### Helpful Compiler

### No Framework Churn

### Enforced Semantic Versioning

## The Elm Architecture

## Javascript Interop

### Flags

### Ports

### Web Components
