import { createRouter, createWebHashHistory } from "vue-router";

import Home from "../views/Home.vue";
import Http from "../views/Http.vue";
import Props from "../views/Props.vue";

export default createRouter({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/http",
      name: "http",
      component: Http,
    },
    {
      path: "/props",
      name: "props",
      component: Props,
    },
  ],
  history: createWebHashHistory(),
});
