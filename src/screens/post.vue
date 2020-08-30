<template>
  <div class="row">
    <div class="col-12">
      <Card :post="post" />
    </div>
    <div class="col-12">
      <div class="comments" v-if="post ">
        <h3 v-if="!reply">Comments</h3>
        <div v-else class="flex-align-center">
          <vs-button transparent @click="backToCmt" dark>
            <i class="bx bx-chevron-left"></i>
          </vs-button>
          <h3>Reply to {{comment.user.first_name}} {{comment.user.last_name}}</h3>
        </div>

        <div class="flex-between-center mb-3 flex-align-center">
          <vs-avatar history history-gradient circle class="mr-3" size="50">
            <img :src="`http://localhost:8000${user.detail.avatar}`" v-if="user.detail" alt />
            <img src="https://vuesax.com/avatars/avatar-3.png" v-else alt />
          </vs-avatar>
          <vs-input v-model="text" style="width:90%" />
        </div>
        <div class="flex-x-between">
          <div class="flex-align-center">
            <vs-button
              @click="$refs.inputFile.click()"
              class="mb-3"
              transparent
              style="min-width: 80px"
              warn
            >
              <i class="bx bx-camera mr-3"></i>
              Upload Photo
            </vs-button>
            <input type="file" @change="onFileChange" ref="inputFile" hidden />
            <div class="commentImage" v-if="url">
              <i class="bx bx-x pointer" @click="clearFile"></i>
              <img :src="url" class="w-100 small-radius" alt />
            </div>
          </div>
          <vs-button @click="addComment" v-if="!reply">
            Send
            <i class="bx bx-chevron-right ml-2"></i>
          </vs-button>
          <vs-button @click="addCommentReplies" v-else>
            Send
            <i class="bx bx-chevron-right ml-2"></i>
          </vs-button>
        </div>

        <div class="comment" v-for="(comment,index) in comments" :key="comment.text">
          <div class="divider"></div>
          <div class="flex-x-between">
            <div class="flex-align-center mb-3" v-if="comment">
              <vs-avatar circle class="mr-2 pointer">
                <img
                  :src="`http://localhost:8000${comment.user.detail.avatar}`"
                  v-if="comment.user.detail"
                  alt
                />
                <img src="https://vuesax.com/avatars/avatar-3.png" v-else alt />
              </vs-avatar>
              <div>
                <p class="mb-0">{{comment.user.first_name}} {{comment.user.last_name}}</p>
                <span class="sm-text">
                  Commented on {{
                  $moment(
                  comment.created_at,
                  "YYYY-MM-DDTHH:mm:ss.SSS"
                  ).format("DD-MM-YYYY HH:mm")
                  }}
                </span>
              </div>
            </div>
            <div class="drop-down" v-if="$store.getters.isOwner(comment.user.id)">
              <vs-button transparent>
                <i class="bx bx-dots-horizontal-rounded"></i>
              </vs-button>
              <div class="drop-items">
                <vs-button class="w-100" transparent @click="removeComment(comment,index)">
                  <i class="bx bx-trash mr-2"></i> Delete
                </vs-button>
              </div>
            </div>
          </div>
          <p>{{comment.text}}</p>
          <img
            :src="`http://localhost:8000${comment.image}`"
            class="small-radius pointer"
            @click="viewImage(`http://localhost:8000${comment.image}`)"
            width="50%"
            v-if="comment.image"
            alt
          />
          <div class="flex-align-center" v-if="!reply">
            <vs-button
              danger
              transparent
              class="mr-3"
              @click="unlikeReply(comment,index)"
              v-if="$store.getters.isLikedComment({comment_id:comment.id,post_id:post.id})"
            >
              <i class="bx bxs-heart mr-2"></i>
              {{comment.commentlikes.length}}
            </vs-button>
            <vs-button dark transparent v-else class="mr-3" @click="likeReply(comment,index)">
              <i class="bx bx-heart mr-2"></i>
              {{comment.commentlikes.length}}
            </vs-button>
            <vs-button transparent @click="replyComment(comment)">
              <i class="bx bx-message-square-detail mr-2"></i>
              {{comment.commentReplies.length}}
            </vs-button>
          </div>
        </div>
      </div>
    </div>

    <vs-dialog not-close blur auto-width not-padding v-model="showImage">
      <div class="con-image">
        <img :src="image" width="100%" class="small-radius" alt />
      </div>
    </vs-dialog>
  </div>
</template>

<script>
import Card from "../components/Card";
import { mapState } from "vuex";
export default {
  data() {
    return {
      post: null,
      post_id: null,
      showImage: false,
      text: "",
      url: null,
      image: null,
      reply: false,
      comment: {},
      comments: [],
    };
  },
  components: {
    Card,
  },
  created() {
    this.post_id = this.$route.query.pid;
    this.setPost();
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    setPost() {
      var post = this.$store.getters.getPost(this.post_id);
      this.comments = post.comments;
      this.post = post;
    },
    viewImage(image) {
      this.image = image;
      this.showImage = true;
    },
    onFileChange(e) {
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert("The file uploaded need to be - gif,jpeg,jpg,png,bmp");
        return false;
      }
      this.image = e.target.files[0];
      this.url = URL.createObjectURL(this.image);
    },
    clearFile() {
      this.image = null;
      this.url = null;
    },
    addComment(e) {
      e.preventDefault();
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      let formData = new FormData();
      formData.append("text", this.text);
      formData.append("post_id", this.post.id);
      if (this.image !== null) {
        formData.append("image", this.image);
      }
      this.$axios
        .post("comment/", formData, config)
        .then((response) => {
          this.post.comments.unshift(response.data);
          this.url = null;
          this.text = "";
          this.image = null;
          this.$store.dispatch("getPosts");
        })
        .catch(function () {});
    },
    addCommentReplies(e) {
      e.preventDefault();
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      let formData = new FormData();
      formData.append("text", this.text);
      formData.append("comment_id", this.comment.id);
      if (this.image !== null) {
        formData.append("image", this.image);
      }
      this.$axios
        .post("comment-reply/", formData, config)
        .then((response) => {
          this.comments.unshift(response.data);
          this.url = null;
          this.text = "";
          this.image = null;
          this.$store.dispatch("getPosts");
        })
        .catch(function () {});
    },
    replyComment(comment) {
      this.comment = comment;
      this.comments = comment.commentReplies;
      this.reply = true;
    },
    backToCmt() {
      this.comments = this.post.comments;
      this.reply = false;
    },
    removeComment(comment, index) {
      if (this.reply) {
        this.$store.dispatch("removeReply", { reply_id: comment.id });
        this.comments.splice(index, 1);
      } else {
        this.$store.dispatch("removeComment", { comment_id: comment.id });
        this.comments.splice(index, 1);
      }
    },
    likeReply(comment, index) {
      this.$store.dispatch("likeComment", { comment_id: comment.id });
      var data = {
        user: this.user,
      };
      this.comments[index].commentlikes.push(data);
    },
    unlikeReply(comment, index) {
      this.$store.dispatch("unlikeComment", { comment_id: comment.id });
      this.comments[index].commentlikes.length =
        this.comments[index].commentlikes.length - 1;
    },
  },
};
</script>

<style  >
.commentImage {
  width: 120px;
}
.comments {
  background: rgb(var(--vs-background)) !important;
  margin-top: 1rem;
  padding: 15px;
  border-radius: 20px;
}
.commentImage i {
  padding: 2px;
  background: rgb(0, 0, 0, 0.2);
  border-radius: 10rem;
  position: absolute;
  margin-left: 90px;
  margin-top: 5px;
}
</style>