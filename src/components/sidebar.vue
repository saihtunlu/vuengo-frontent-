<template>
  <div class="sidebar w-100">
    <div>
      <div
        v-for="tab in tabs"
        :key="tab.name"
        @click="
          $router.push({
            name: tab.to,
          })
        "
        class="flex-x-between sidebar-item pointer w-100 flex-align-center"
      >
        <p class="flex-align-center">
          <i class="bx mr-3" :class="tab.icon"></i>
          {{tab.name}}
        </p>
        <div class="dot" v-if="activeIndex===tab.id"></div>
      </div>
    </div>
    <vs-button
      @click="$store.dispatch('logout')"
      flat
      danger
      class="flex-align-center w-100 flex-align-center"
    >
      <i class="bx bx-log-out-circle mr-3"></i>
      Log Out
    </vs-button>
  </div>
</template>

<script>
var tabs = [
  {
    name: "Feed",
    to: "Home",
    icon: "bx-grid-alt",
    id: 1,
  },

  {
    name: "Setting",
    to: "Setting",
    icon: "bx-slider",
    id: 8,
  },
];
import { mapState } from "vuex";
export default {
  data() {
    return {
      tabs: tabs,
    };
  },
  computed: {
    ...mapState(["activeIndex"]),
  },
  created() {
    console.log("created -> this.activeIndex", this.activeIndex);
  },
};
</script>

<style  >
.sidebar {
  padding: 15px;
  border-radius: 25px;
  box-shadow: 0px 4px 25px -8px rgb(0, 0, 0, 0.05);
  margin-top: 50px;
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: rgb(var(--vs-background));
}
.dot {
  background: rgb(var(--vs-primary));
  width: 8px;
  height: 8px;
  border-radius: 10rem;
  box-shadow: 0px 4px 25px 0px rgb(var(--vs-primary));
}
.sidebar .sidebar-item:hover {
  background: rgb(var(--vs-primary), 0.05);
}
.sidebar .sidebar-item {
  padding: 5px 15px;
  border-radius: 15px;
  height: 40px;
  margin-bottom: 5px;
}
</style>