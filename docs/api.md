# elmBridge

```ts
function elmBridge(
  elm: unknown, 
  options?: string | { name?: string; props?: any; emit?: string[] }):
  DefineComponent<{...}>
```

`elm-vue-bridge` provides a single function, `elmBridge`, which is used to genereate a Vue component from an Elm module. It takes two arguments:

### `elm`

- Type: `unknown` (Elm apps tend to have nested objects, and so it is easier to treat them as unknown for our needs).
- Required: `true`

This is the Elm app we are wrapping in a Vue component.

### `options`

- Type: `string | { name?: string; props?: any; emit?: string[] }`
- Required: `false`

The options are one of two values: either a string (the component name), or a object (name, props, and emit).

#### `name`

- Type: `string`
- Required: `false`

This is the name we are providing to our Vue component. It is optional, and if it is left out then our component will be registered as `<ElmBridge>` in the Vue devtools.

#### `props`

- Type: `any` (to be improved)
- Required: `false`

If you want to pass props into your component (instead of using flags), you can define them here. Props defined here should be compatible with a Vue component. Keep in mind that this type structure must be reflected in the Elm code as well, or Elm will throw an error that unexpected data was provided to flags.

#### `emit`

- Type: `string[]`
- Required: `false`

Rather than using `ports`, you can provide a list of events that your Vue component can emit. `elm-vue-bridge` will attempt to subscribe to Elm ports that match the provided keys, and will trigger events when those ports receive data.