import { createRouter, createWebHashHistory } from "vue-router";

import Home from "../views/Home.vue";

export default createRouter({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
  ],
  history: createWebHashHistory(),
});
