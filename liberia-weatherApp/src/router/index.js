import { createRouter, createWebHistory } from "vue-router";
import App from "../App.vue";
import WeatherDetail from "../views/WeatherDetail.vue";

const routes = [
  { path: "/", name: "Home", component: App },
  { path: "/weather/:city", name: "WeatherDetail", component: WeatherDetail, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
