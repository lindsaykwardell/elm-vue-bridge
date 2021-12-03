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

### No Framework Churn

<table>
  <thead>
    <tr>
      <th>JavaScript</th>
      <th>Elm</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>npm/yarn</td>
        <td>Built in</td>
    </tr>
    <tr>
        <td>Vue 2/3</td>
        <td>Built in</td>
    </tr>
    <tr>
        <td>Vuex/Pinia/Harlem</td>
        <td>Built in</td>
    </tr>
    <tr>
        <td>Object.freeze/readonly</td>
        <td>Built in</td>
    </tr>
    <tr>
        <td>TypeScript</td>
        <td>Built in</td>
    </tr>
    <tr>
        <td>Webpack/Rollup/etc</td>
        <td>Built in</td>
    </tr>
    <tr>
        <td>ESLint/Prettier</td>
        <td>Elm Format</td>
    </tr>
    <tr>
        <td>Jest/Mocha</td>
        <td>Elm Test</td>
    </tr>
  </tbody>
</table>

### Enforced Semantic Versioning

## The Elm Architecture

## Javascript Interop

### Flags

### Ports

### Web Components

<style>
  table {
    text-align: center;
  }
  td {
    width: 50%;
  }
</style>