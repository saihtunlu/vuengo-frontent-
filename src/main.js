import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "./axios";
import store from "./store";
import pusher from "./pusher";

Vue.prototype.$axios = axios;
Vue.prototype.$pusher = pusher;

import Vuesax from "vuesax";
import "vuesax/dist/vuesax.css"; //Vuesax styles
Vue.use(Vuesax, {
  colors: {
    primary: "#F38352",
  },
});
Vue.use(require("vue-moment"));
//import css
import "./assets/css/responsive.css";
import "./assets/css/animation.css";
import "./assets/css/main.css";
import "./assets/boxIcon/css/boxicons.min.css";

Vue.config.productionTip = false;
new Vue({
  created() {
    const userInfo = localStorage.getItem("user");
    if (userInfo) {
      const userData = JSON.parse(userInfo);
      this.$store.commit("setCurrentUser", userData);
      this.$store.dispatch("getPosts");
    }
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          this.$store.dispatch("logout");
        }
        return Promise.reject(error);
      }
    );
  },
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
