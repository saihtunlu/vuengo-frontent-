<template>
  <div id="app" class="container-fluid">
    <div class="lg-80" v-if="isLoggedIn && isReady">
      <div class="row lg-80">
        <div class="col-lg-4">
          <SideBar v-if="isLoggedIn" />
        </div>
        <div class="col-lg-8" id="route-col" style="max-height:100vh;overflow-y:scroll">
          <router-view :key="$route.fullPath" class="router_view mt-5" />
        </div>
      </div>
    </div>
    <router-view v-if="!isLoggedIn" :key="$route.fullPath" class="router_view" />
  </div>
</template>

<script>
import SideBar from "./components/sidebar";

import { mapGetters, mapState } from "vuex";
export default {
  name: "App",
  components: {
    SideBar,
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapState(["isReady"]),
  },
  created() {},
};
</script>
