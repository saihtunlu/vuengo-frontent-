<template>
  <div class="container">
    <div class="video-container" ref="video-container">
      <video class="video-here" ref="video-here" muted autoplay></video>
      <video class="video-there" ref="video-there" autoplay></video>
      <div class="text-right" v-for="(name, userId) in others" :key="userId">
        <button @click="startVideoChat(userId)" v-text="`Talk with ${name}`" />
      </div>
    </div>
  </div>
</template>
<script>
import Peer from "peerjs";
export default {
  props: ["user", "uri", "chat_to"],
  data() {
    return {
      others: [],
      channel: null,
      stream: null,
      myPeer: null,
    };
  },
  mounted() {
    this.setupVideoChat();
    this.watching();
  },
  methods: {
    startVideoChat(userId) {
      this.getPeer(userId, true);
    },
    watching() {
      var channel = this.$pusher.subscribe("video-chat-" + this.uri);
      channel.bind(`client-user-id-${this.user.id}`, (signal) => {
        this.streamVideo(signal.peerId);
      });
    },
    streamVideo(peerId) {
      const call = this.myPeer.call(peerId, this.stream);
      const videoThere = this.$refs["video-there"];
      call
        .on("stream", (stream) => {
          videoThere.srcObject = stream;
        })
        .on("close", () => {
          videoThere.remove();
          const peer = this.myPeer[peerId];
          console.log("streamVideo -> peer", peer);
          if (peer !== undefined) {
            peer.destroy();
          }
          delete this.myPeer[peerId];
        });
    },
    initPeer() {
      this.myPeer = new Peer(undefined, {
        host: "/",
        port: 3001,
      });
      this.myPeer.on("open", (id) => {
        console.log("initPeer -> id", id);
        this.$axios
          .post("start-video-chat/", {
            uri: this.uri,
            userId: this.chat_to,
            peerId: id,
          })
          .then((response) => {
            console.log("setupVideoChat -> response", response);
          });
      });
      const videoThere = this.$refs["video-there"];
      this.myPeer.on("call", (call) => {
        console.log("initPeer -> call", call);
        call.answer(this.stream);
        call
          .on("stream", (stream) => {
            videoThere.srcObject = stream;
          })
          .on("close", () => {
            console.log("initPeer -> close");
            videoThere.remove();
          });
      });
    },
    setupVideoChat() {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        })
        .then((stream) => {
          const videoHere = this.$refs["video-here"];
          videoHere.srcObject = stream;
          this.stream = stream;
          this.initPeer("video-chat-" + this.uri);
        });
    },
  },
};
</script>
<style>
.video-container {
  width: 500px;
  height: 380px;
  margin: 8px auto;
  border: 3px solid #000;
  position: relative;
  box-shadow: 1px 1px 1px #9e9e9e;
}
.video-here {
  width: 130px;
  position: absolute;
  left: 10px;
  bottom: 16px;
  border: 1px solid #000;
  border-radius: 2px;
  z-index: 2;
}
.video-there {
  width: 100%;
  height: 100%;
  z-index: 1;
}
.text-right {
  text-align: right;
}
</style>