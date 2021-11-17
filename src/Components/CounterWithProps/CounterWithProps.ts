import elmBridge from "../../lib";
import { Elm } from "./Main.elm";

export default elmBridge(Elm, {
  name: "CounterWithProps",
  emit: ["sendCount"],
  props: {
    initialValue: {
      type: Number,
      default: 2,
    },
  },
});
