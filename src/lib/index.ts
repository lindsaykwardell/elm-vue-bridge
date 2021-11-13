import { ref, onMounted, defineComponent, h } from "vue";

type ElmApp = {
  init: (input: {
    node: HTMLElement;
    flags:
      | string
      | number
      | boolean
      | unknown[]
      | Record<string, any>
      | undefined;
  }) => { ports: any };
};

const elmBridge = (elm: ElmApp) => {
  return defineComponent({
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
    setup(props) {
      const mountable = ref();

      function findInit(elm: any): any {
        if (Object.keys(elm).includes("init")) {
          return elm.init;
        }

        for (const key of Object.keys(elm)) {
          const init = findInit(elm[key]);
          if (init) {
            return init;
          }
        }

        return false;
      }

      onMounted(() => {
        const app = findInit(elm)({
          node: mountable.value,
          flags: props?.flags,
        });

        if (props.ports) {
          props.ports(app.ports);
        }
      });

      return () => h("div", { ref: mountable });
    },
  });
};

export default elmBridge;
