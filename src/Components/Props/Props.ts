import elmBridge from "../../lib";
import { Elm } from "./Main.elm";

export default elmBridge(Elm, {
  name: "ElmProps",
  emit: ["sendCount"],
  props: {
    initialValue: {
      type: Number,
      default: 2,
    },
  },
});
