import Vue from "vue";
import Entrypoint from "./Entrypoint.vue";

Vue.config.productionTip = false;

new Vue({
  render: h => h(Entrypoint)
}).$mount("#app");
