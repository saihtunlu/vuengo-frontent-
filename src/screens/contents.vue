<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>Contents</h1>
        <div
          class="content flex-x-between"
          @click="startChatSession(content.id)"
          v-for="content in contents"
          :key="content.username"
        >
          <div class="flex-align-center">
            <vs-avatar size="55" class="mr-3" badge badge-color="success">
              <img :src="`http://localhost:8000${content.detail.avatar}`" v-if="content.detail" alt />
              <img src="https://vuesax.com/avatars/avatar-3.png" v-else alt />
            </vs-avatar>
            <h3 class="my-0">{{content.first_name}} {{content.last_name}}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contents: [],
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  created() {
    this.$store.commit("setActiveIndex", this.$route.meta.index);
    this.getContents();
  },
  methods: {
    startChatSession(id) {
      this.$axios
        .post(`chats/`, { user_id: id })
        .then((response) => {
          this.$router.push({
            name: "Chat",
            params: { uri: response.data.uri, data: response.data },
          });
        })
        .catch((error) => {
          console.log("startChatSession -> error", error);
        });
    },
    getContents() {
      this.$axios.get("/contents/").then((response) => {
        console.log("response", response);
        this.contents = response.data;
      });
    },
  },
};
</script>

<style >
.content {
  background: rgb(var(--vs-background));
  margin-bottom: 1rem;
  padding: 10px;
  border-radius: 30px;
  cursor: pointer;
}
</style>