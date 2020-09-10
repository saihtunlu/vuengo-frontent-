<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>Chats</h1>
        <div
          class="content flex-x-between"
          @click="$router.push({name: 'Chat',params: { uri: chat.uri }})"
          v-for="chat in chats"
          :key="chat.uri"
        >
          <div class="flex-align-center">
            <vs-avatar class="mr-3" badge badge-color="success">
              <img
                :src="`http://localhost:8000${chat.creator.id === user.id? chat.invited_user.detail.avatar:chat.creator.detail.avatar}`"
                v-if="chat.creator.id === user.id? chat.invited_user.detail: chat.creator.detail"
                alt
              />
              <img src="https://vuesax.com/avatars/avatar-3.png" v-else alt />
            </vs-avatar>
            <div>
              <h3
                class="my-0"
              >{{chat.creator.id === user.id? `${chat.invited_user.first_name} ${chat.invited_user.last_name}`:`${chat.creator.first_name} ${chat.creator.last_name}`}}</h3>
              <p class="my-0">{{chat.message.text}}</p>
            </div>
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
      chats: [],
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  created() {
    this.$store.commit("setActiveIndex", this.$route.meta.index);
    this.getChats();
  },
  methods: {
    getChats() {
      this.$axios.get("/my-chats/").then((response) => {
        console.log("response", response);
        this.chats = response.data;
      });
    },
  },
};
</script>
