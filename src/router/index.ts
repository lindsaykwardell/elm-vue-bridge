import { createRouter, createWebHashHistory } from "vue-router";

import Home from "../views/Home.vue";
import Http from "../Components/Examples/Http/Http.vue";

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
  ],
  history: createWebHashHistory(),
});
