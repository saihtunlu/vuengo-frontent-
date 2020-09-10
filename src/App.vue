<template>
  <div id="app" class="container-fluid">
    <div class="lg-80" v-if="isLoggedIn && isReady">
      <div class="row lg-80">
        <div class="col-lg-4">
          <SideBar v-if="isLoggedIn" />
        </div>
        <div
          class="col-lg-8"
          id="route-col"
          style="max-height:100vh;overflow-y:scroll"
        >
          <router-view :key="$route.fullPath" class="router_view mt-5" />
        </div>
      </div>
    </div>
    <router-view
      v-if="!isLoggedIn"
      :key="$route.fullPath"
      class="router_view"
    />
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
    ...mapState(["isReady", "user"]),
  },
  created() {
    var channel = this.$pusher.subscribe(`chat${this.user.id}`);
    channel.bind(`newMessage${this.user.id}`, (response) => {
      this.received(response.message);
      this.newMessage(response.message);
    });
  },
  methods: {
    newMessage(data) {
      // Let's check if the browser supports notifications
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      }
      // Let's check whether notification permissions have already been granted
      else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        new Notification(data.text);
      }

      // Otherwise, we need to ask the user for permission
      else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function(permission) {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            new Notification(data.text);
          }
        });
      }
    },
    received(data) {
      this.$axios
        .put(`received/`, {
          chat_session: data.chat_session.id,
          sender: data.user.id,
        })
        .then((response) => {
          console.log("received -> response", response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
