<template>
  <div id="chat" v-if="data">
    <div class="flex-align-center">
      <vs-button transparent @click="$router.go(-1)">
        <i class="bx bx-chevron-left"></i>
      </vs-button>
      <vs-avatar class="mr-3" badge badge-color="success" v-if="!isStarted">
        <img
          :src="`http://localhost:8000${
            data.invited_user.id === user.id
              ? data.creator.detail.avatar
              : data.invited_user.detail.avatar
          }`"
          v-if="
            data.invited_user.id === user.id
              ? data.creator.detail
              : data.invited_user.detail
          "
          alt
        />
        <img src="https://vuesax.com/avatars/avatar-3.png" v-else alt />
      </vs-avatar>
      <h3 v-if="!isStarted">
        {{
          data.invited_user.id === user.id
            ? `${data.creator.first_name} ${data.creator.last_name}`
            : `${data.invited_user.first_name} ${data.invited_user.last_name}`
        }}
      </h3>
    </div>
    <div id="feed" ref="feed">
      <div v-if="isStarted" class="flex-center py-5 flex-column">
        <vs-avatar size="120">
          <img
            :src="`http://localhost:8000${
              data.invited_user.id === user.id
                ? data.creator.detail.avatar
                : data.invited_user.detail.avatar
            }`"
            v-if="
              data.invited_user.id === user.id
                ? data.creator.detail
                : data.invited_user.detail
            "
            alt
          />
          <img src="https://vuesax.com/avatars/avatar-3.png" v-else alt />
        </vs-avatar>
        <h1>
          {{
            data.invited_user.id === user.id
              ? `${data.creator.first_name} ${data.creator.last_name}`
              : `${data.invited_user.first_name} ${data.invited_user.last_name}`
          }}
        </h1>
        <p v-if="data.creator.id === user.id">
          You've invited {{ data.invited_user.first_name }}
          {{ data.invited_user.last_name }} to chat.
        </p>
        <p v-if="data.invited_user.id === user.id">
          {{ data.creator_user.first_name }}
          {{ data.creator_user.last_name }}'ve invited you to chat.
        </p>
      </div>
      <div v-else>
        <div
          v-for="(message, n) in messages"
          :key="message.create_date + message.image + message.received + n"
          class="flex-align-center px-2"
          :class="message.user.id === user.id ? 'sent' : 'received'"
        >
          <vs-avatar
            class="mr-3"
            style="min-width: 44px !important"
            badge
            badge-color="success"
            v-if="message.user.id !== user.id"
          >
            <img
              :src="`http://localhost:8000${message.user.detail.avatar}`"
              v-if="message.user.detail"
              alt
            />
            <img src="https://vuesax.com/avatars/avatar-3.png" v-else alt />
          </vs-avatar>
          <div
            class="flex-column"
            :class="message.id === messages[ReadIndex].id ? 'Seen-Message' : ''"
          >
            <div
              class="flex-align-center message-text"
              :class="message.id === messages[ReadIndex].id ? 'Seen-Line' : ''"
              v-if="message.text && message.text !== ''"
            >
              <i
                class="bx bx-loader-alt bx-spin mr-2"
                v-if="message.user.id === user.id && message.sending"
              ></i>
              <p class="text">{{ message.text }}</p>
              <i
                class="bx bx-loader-alt bx-spin ml-2"
                v-if="message.user.id !== user.id && message.sending"
              ></i>
              <i
                class="bx bx-check-circle status"
                v-if="!message.received && message.user.id == user.id"
              ></i>
              <i
                class="bx bxs-check-circle status"
                v-if="
                  message.received &&
                  !message.seen &&
                  message.user.id == user.id
                "
              ></i>
              <vs-avatar
                class="seen-badge"
                circle
                size="12"
                v-if="ReadIndex && message.id === messages[ReadIndex].id"
              >
                <img
                  :src="`http://localhost:8000${
                    data.invited_user.id === user.id
                      ? data.creator.detail.avatar
                      : data.invited_user.detail.avatar
                  }`"
                />
              </vs-avatar>
            </div>

            <div
              class="flex-align-center my-2"
              v-if="message.image"
              :class="
                ReadIndex && message.id === messages[ReadIndex].id
                  ? 'Seen-Line'
                  : ''
              "
            >
              <i
                class="bx bx-loader-alt bx-spin mr-2"
                v-if="message.user.id === user.id && message.sending"
              ></i>
              <img
                style="width: 120px"
                @click="
                  () => {
                    showImage = true;
                    popUpImage = message.sending
                      ? message.image
                      : `http://localhost:8000${message.image}`;
                  }
                "
                class="small-radius pointer"
                :src="
                  message.sending
                    ? message.image
                    : `http://localhost:8000${message.image}`
                "
                alt
              />
              <i
                class="bx bx-loader-alt bx-spin ml-2"
                v-if="message.user.id !== user.id && message.sending"
              ></i>
              <i
                class="bx bx-check-circle status"
                v-if="!message.received && message.user.id == user.id"
              ></i>
              <i
                class="bx bxs-check-circle status"
                v-if="
                  message.received &&
                  !message.seen &&
                  message.user.id == user.id
                "
              ></i>
              <vs-avatar
                class="seen-badge"
                circle
                size="12"
                v-if="ReadIndex && message.id === messages[ReadIndex].id"
              >
                <img
                  :src="`http://localhost:8000${
                    data.invited_user.id === user.id
                      ? data.creator.detail.avatar
                      : data.invited_user.detail.avatar
                  }`"
                />
              </vs-avatar>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-align-center animated bounceIn add-extra" v-if="showExtra">
      <vs-button @click="$refs.image.click()" transparent>
        <i class="bx bx-camera"></i>
      </vs-button>
      <input type="file" @change="onFileChange" ref="image" hidden />
      <vs-button transparent>
        <i class="bx bx-file"></i>
      </vs-button>
    </div>
    <div class="flex-align-center mt-2">
      <vs-button @click="showExtra = !showExtra" transparent>
        <i class="bx bx-plus" v-if="!showExtra"></i>
        <i class="bx bx-x" v-if="showExtra"></i>
      </vs-button>
      <vs-button @click="showImage = true" transparent>
        <i class="bx bx-video"></i>
      </vs-button>
      <vs-avatar v-if="image" badge-position="top-right" class="mr-2 chatImage">
        <img
          :src="url"
          class="pointer"
          @click="
            () => {
              showImage = true;
              popUpImage = url;
            }
          "
          alt
        />
        <template #badge>
          <i class="bx bx-x" @click="clearFile" style="font-size: 14px"></i>
        </template>
      </vs-avatar>
      <vs-input
        class="mr-2"
        style="width: 75%; transistion: 0.3s all"
        :style="image ? `width:60% !important;` : ''"
        @keydown.enter="postMessage"
        v-model="text"
        placeholder="Name"
      />
      <vs-button @click="postMessage" type="submite" transparent>
        <i class="bx bx-send"></i>
      </vs-button>
    </div>

    <vs-dialog not-close blur auto-width not-padding v-model="showImage">
      <div class="con-image">
        <!-- <img :src="popUpImage" width="100%" class="small-radius" alt /> -->
        <VideoChat :user="user" :chat_to="chat_to" :uri="data.uri" />
      </div>
    </vs-dialog>
  </div>
</template>

<script>
import VideoChat from "../components/VideoChat";
// import Peer from "peerjs";

export default {
  data() {
    return {
      showImage: false,
      popUpImage: "",
      showExtra: false,
      text: "",
      ReadIndex: null,
      data: null,
      image: null,
      isStarted: false,
      messages: [],
      chat_to: null,
      url: null,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  components: {
    VideoChat,
  },
  created() {
    this.$store.commit("setActiveIndex", this.$route.meta.index);
    this.getChatDetails();
    this.getMessage();
    this.initPusher();
    // this.initPeer();
  },
  mounted() {},
  watch: {
    messages() {
      if (this.messages.length === 0) {
        this.isStarted = true;
      } else {
        this.isStarted = false;
      }
    },
  },
  methods: {
    // initPeer() {
    //   const myPeer = new Peer(undefined, {
    //     host: "/",
    //     port: "3001",
    //   });
    //   myPeer.on("open", (id) => {
    //     console.log("initPeer -> id", id);
    //   });
    // },
    initPusher() {
      var Chat = this.$pusher.subscribe(`chat${this.user.id}`);
      Chat.bind(`newMessage${this.user.id}`, (response) => {
        this.messages.push(response.message);
        this.seen(response.message);
        this.scrollToBottom();
      });
      Chat.bind(`Received${this.user.id}`, () => {
        var messages = this.messages.map((data) => {
          if (!data.received) {
            data.received = true;
          }
          return data;
        });
        this.messages = messages;
      });
      Chat.bind(`Seen${this.user.id}`, () => {
        var messages = this.messages.map((data) => {
          if (!data.seen) {
            data.seen = true;
          }
          return data;
        });
        this.messages = messages;
        this.filterRead(messages);
      });
    },
    getChatDetails() {
      this.$axios
        .get(`http://localhost:8000/chats/${this.$route.params.uri}`)
        .then((response) => {
          console.log("getChatDetails -> response", response);
          this.data = response.data;
          this.chat_to =
            this.user.id === response.data.creator.id
              ? response.data.invited_user.id
              : response.data.creator.id;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    postMessage() {
      const array = {
        text: this.text,
        image: this.url,
        create_date: new Date(),
        user: this.user,
        sending: true,
      };
      this.messages.push(array);
      this.scrollToBottom();
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      let formData = new FormData();
      formData.append("text", this.text);
      formData.append("chat_to", this.chat_to);
      if (this.image !== null) {
        formData.append("image", this.image);
      }
      this.text = "";
      this.image = null;
      this.url = null;
      this.$axios
        .post(
          `http://localhost:8000/chats/${this.$route.params.uri}/messages/`,
          formData,
          config
        )
        .then((response) => {
          response.data.sending = false;
          this.messages[this.messages.length - 1] = response.data;
          this.text = null;
          this.text = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getMessage() {
      this.$axios
        .get(`http://localhost:8000/chats/${this.$route.params.uri}/messages/`)
        .then((response) => {
          this.messages = response.data.messages;
          this.filterRead(response.data.messages);
          this.scrollToBottom();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    scrollToBottom() {
      setTimeout(() => {
        this.$refs.feed.scrollTop =
          this.$refs.feed.scrollHeight - this.$refs.feed.clientHeight;
      }, 50);
    },
    onFileChange(e) {
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert("The file uploaded need to be - gif,jpeg,jpg,png,bmp");
        return false;
      }
      this.image = e.target.files[0];
      this.url = URL.createObjectURL(this.image);
      this.showExtra = false;
    },
    clearFile() {
      this.image = null;
      this.url = null;
    },
    seen(data) {
      this.$axios
        .put(`seen/`, {
          chat_session: data.chat_session.id,
          sender: data.user.id,
        })
        .then((response) => {
          console.log("seen -> response", response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    filterRead(messages) {
      var filter = messages.filter(function (data) {
        return data.seen === true;
      });

      if (filter.length !== 0) {
        var id = filter[parseInt(filter.length) - 1].id;
        var index = messages
          .map((x) => {
            return x.id;
          })
          .indexOf(id);
        this.ReadIndex = index;
      } else {
        this.ReadIndex = null;
      }
      console.log("filterRead -> ReadIndex", this.ReadIndex);
    },
  },
};
</script>
<style>
.status {
  font-size: 12px !important;
  position: relative;
  bottom: -10px;
  margin-left: 3px;
}
div#feed {
  height: 65vh;
  background: rgb(var(--vs-gray-0));
  border-radius: 10px;
  margin-top: 8px;
  overflow-x: hidden;
  overflow-y: scroll;
}
.sent {
  justify-content: flex-end;
  margin: 0.5rem 0rem;
}
.sent .text {
  background: rgb(255, 255, 255, 0.1);
  -webkit-animation-name: bounceInRight;
  animation-name: bounceInRight;
}
.received {
  margin: 0.5rem 0rem;
}

.received .text {
  background: rgb(var(--vs-primary), 0.1);
  -webkit-animation-name: bounceInLeft;
  animation-name: bounceInLeft;
}
.received .flex-column.Seen-Message {
  width: 100%;
}
.received .flex-column.Seen-Message .Seen-Line {
  justify-content: space-between !important;
  align-items: flex-end !important;
}
.sent .flex-column.Seen-Message .Seen-Line {
  align-items: flex-end !important;
}
.sent .message-text {
  justify-content: flex-end !important;
}
.text {
  padding: 10px 15px;
  border-radius: 20px;
}
div#chat {
  border-radius: 20px;
  background: rgb(var(--vs-background));
  padding: 10px;
}
.add-extra {
  background: rgb(var(--vs-background));
  border-radius: 20px;
  padding: 5px 10px;
  position: absolute;
  z-index: 10;
  margin-top: -70px;
  margin-left: 10px;
  animation-duration: 0.3s !important;
}
.chatImage .vs-avatar__badge.isSlot.top-right {
  min-width: 12px !important;
  padding: 2px !important;
  cursor: pointer;
}
/* ------------------------------------------------'mobile'------------------------------------------------ */
@media screen and (max-width: 600px) {
}

/* ------------------------------------------------'tablet'------------------------------------------------ */
@media screen and (min-width: 600px) and (max-width: 992px) {
}

/* ------------------------------------------------"desktop"------------------------------------------------ */
@media (min-width: 992px) {
  div#feed {
    height: 65vh;
  }
}
</style>
