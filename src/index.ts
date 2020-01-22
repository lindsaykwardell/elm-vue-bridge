type ElmApp = {
  init: (input: {
    node: HTMLElement;
    flags: string | number | object;
  }) => { ports: any };
};

const elmBridge = (elm: ElmApp) => {
  return {
    props: {
      ports: {
        type: Function,
        required: false
      },
      flags: {
        type: [String, Number, Object, Array, Boolean],
        required: false
      }
    },
    render(createElement: any, _context: any) {
      return createElement("div");
    },
    mounted() {
      const node = this.$el;

      const elmPlaceholder = document.createElement("div");
      node.appendChild(elmPlaceholder);

      const app = elm.init({
        node: elmPlaceholder,
        flags: this.$props.flags
      });

      if (this.$props.ports) {
        this.$props.ports(app.ports);
      }
    }
  };
};

export = elmBridge;
