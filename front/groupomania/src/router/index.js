import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/majactu",
    name: "MajActu",
    component: () => import("../views/MajActu.vue"),
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
