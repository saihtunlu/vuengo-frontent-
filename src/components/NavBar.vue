<template>
  <vs-navbar center-collapsed v-model="active">
    <template #left>
      <img src="../assets/logo.svg" width="30px" class="m-3" alt />
    </template>
    <!-- <vs-navbar-item :active="active == 'guide'" id="guide">Guide</vs-navbar-item>
    <vs-navbar-item :active="active == 'docs'" id="docs">Documents</vs-navbar-item>
    <vs-navbar-item :active="active == 'components'" id="components">Components</vs-navbar-item>
    <vs-navbar-item :active="active == 'license'" id="license">license</vs-navbar-item>-->
    <template #right>
      <vs-button flat v-if="!isLoggedIn" to="/login">Login</vs-button>
      <vs-button flat v-else @click="logout">Log out</vs-button>
      <vs-button>Get Started</vs-button>
    </template>
  </vs-navbar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      active: true,
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
  mounted() {
    console.log("mounted -> this.isLoggedIn", this.isLoggedIn);
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>