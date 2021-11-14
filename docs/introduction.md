# Introduction

From the [Elm Guide](https://guide.elm-lang.org/), the official guide to learning Elm:

> Elm is a functional language that compiles to JavaScript. It helps you make websites and web apps. It has a strong emphasis on simplicity and quality tooling.

As a language, Elm is an excellent way to get started in functional programming using the web as a platform. Its strong emphasis on being delightful to developers makes learning the language and building applications for it very enjoyable. In fact, it's my favorite programming language for projects of all sizes!

Often, when a developer is starting with a new framework or language, the initial instinct is to build new projects using that tool. This can be very instructive, especially with a programming language. However, one of the strengths of Elm is that it compiles to Javascript, and as such it can be integrated with any existing web application.

In his talk "[From Rails To Elm and Haskell](https://youtu.be/5CYeZ2kEiOI)", Richard Feldman talks about how the team at NoRedInk has run experiments in a small portion of their application in order to test new technologies. These low risk experiments allowed the team to try out new approaches to development (including Elm), something that would have been impossible if their approach had been to rewrite everything at once!

**`elm-vue-bridge`** seeks to help developers familiar with Vue to explore the Elm ecosystem and perform their own experiments with the language. It provides a function to wrap an Elm module within a Vue component, and interact with it inside of your existing codebase. In this way, Elm can be introduced into your project without having to rewrite your architecture.