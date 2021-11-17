import { ref, watch, onMounted, defineComponent, h } from "vue";

type App = {
  ports: {
    [key: string]: {
      send: (value: unknown) => void;
      subscribe: (callback: (value: unknown) => void) => () => void;
    };
  };
};

const elmBridge = (
  elm: unknown,
  options?: string | { name?: string; props?: any; emit?: string[] }
) => {
  const name =
    typeof options === "string" ? options : options?.name || "ElmBridge";

  const mixin = typeof options !== "string" ? (options as any) : {};

  return defineComponent({
    name,
    mixins: [mixin],
    props: {
      ports: {
        type: Function,
        required: false,
      },
      flags: {
        type: [String, Number, Object, Array, Boolean],
        required: false,
      },
    },
    setup(props, { emit }) {
      let app: null | App = null;
      const mountable = ref();

      watch(props, () => app?.ports.updateProps?.send(props));

      function findInit(
        elm: any
      ): null | ((init: { node: HTMLElement; flags: any }) => App) {
        if (Object.keys(elm).includes("init")) {
          return elm.init;
        }

        for (const key of Object.keys(elm)) {
          const init = findInit(elm[key]);
          if (init) {
            return init;
          }
        }

        return null;
      }

      onMounted(() => {
        let flags = props?.flags;

        if (!flags) {
          flags = {};

          Object.keys(
            (typeof options !== "string" && options?.props) || {}
            // @ts-ignore
          ).forEach((key) => (flags[key] = props?.[key]));
        }

        app =
          findInit(elm)?.({
            node: mountable.value,
            flags: flags,
          }) || null;

        if (
          app &&
          (props.ports || (typeof options !== "string" && options?.emit))
        ) {
          props?.ports?.(app.ports);

          if (typeof options !== "string") {
            console.log("here");
            options?.emit?.forEach((key) => {
              console.log(key);
              app?.ports[key].subscribe((value) => emit(key, value));
            });
          }
        }
      });

      return () => h("div", { ref: mountable });
    },
  });
};

export default elmBridge;
