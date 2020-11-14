<template>
  <div class="row">
    <div class="col-12">
      <Poster />
    </div>
    <div
      class="flex-center col-12 mt-medium"
      v-for="post in posts"
      :key="post.id"
    >
      <Card :post="post" />
    </div>
  </div>
</template>
<script>
import Card from "../components/Card";
import Poster from "../components/Poster";
import { mapState } from "vuex";
export default {
  components: {
    Card,
    Poster,
  },

  computed: {
    ...mapState(["posts"]),
  },
  created() {
    this.$store.commit("setActiveIndex", this.$route.meta.index);
  },
};
</script>
