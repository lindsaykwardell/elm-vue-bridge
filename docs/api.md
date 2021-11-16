# elmBridge

```ts
function elmBridge(elm: unknown, name?: string): DefineComponent<{...}>
```

`elm-vue-bridge` provides a single function, `elmBridge`, which is used to genereate a Vue component from an Elm module. It takes two arguments:

### `elm`

- Type: `unknown` (Elm apps tend to have nested objects, and so it is easier to treat then as unknown for our needs).
- Required: `true`
- Details:

This is the Elm app we are wrapping in a Vue component.

### `name`

- Type: `string`
- Required: `false`
- Details

This is the name we are providing to our Vue component. It is optional, and if it is left out then our component will be registered as `<Anonymous Component>` in the Vue devtools.