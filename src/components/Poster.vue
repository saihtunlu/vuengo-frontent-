<template>
  <div>
    <div class="poster big-radius">
      <div class="flex-between-center flex-align-center">
        <vs-avatar history history-gradient circle class="mr-3" size="50">
          <img :src="`http://localhost:8000${user.detail.avatar}`" v-if="user.detail" alt />
          <img src="https://vuesax.com/avatars/avatar-3.png" v-else alt />
        </vs-avatar>
        <vs-button @click="showAddPost=true" style="width:90%" flat>What's on your mind?</vs-button>
      </div>
    </div>
    <vs-dialog blur overflow-hidden not-close class="addpost" v-model="showAddPost">
      <div class="con-content">
        <div class="flex-align-center mb-3">
          <vs-avatar circle class="mr-2 pointer">
            <img :src="`http://localhost:8000${user.detail.avatar}`" v-if="user.detail" alt />
            <img src="https://vuesax.com/avatars/avatar-3.png" v-else alt />
          </vs-avatar>
          <p>{{user.first_name}} {{user.last_name}}</p>
        </div>
        <textarea
          name
          v-model="content"
          class="mb-3"
          :placeholder="`What's on your mind? ${user.first_name}`"
          id
          cols="30"
          rows="10"
        ></textarea>
        <div class="postImg" v-if="url">
          <i class="bx bx-x pointer delImg" @click="clearFile"></i>
          <img :src="url" width="100%" class="small-radius mb-3 pointer" />
        </div>
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
        <vs-button @click="addPost" class="w-100">
          Post
          <i class="bx bx-chevron-right ml-2" v-if="!loading"></i>
          <i class="bx bx-loader-circle bx-spin ml-2" v-else></i>
        </vs-button>
      </div>
    </vs-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      showAddPost: false,
      image: null,
      url: null,
      content: "",
      loading: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
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
    addPost(e) {
      e.preventDefault();
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      let formData = new FormData();
      formData.append("content", this.content);
      if (this.image !== null) {
        formData.append("image", this.image);
      }
      this.$axios
        .post("create-post/", formData, config)
        .then((response) => {
          this.showAddPost = false;
          this.$store.dispatch("addPost", { post: response.data });
        })
        .catch(function (err) {
          this.showAddPost = false;
          console.log("addPost -> err", err.response.data);
        });
    },
  },
};
</script>
<style>
.poster {
  padding: 15px;
  background: rgb(var(--vs-background));
}
.vs-card-content.type-4 .vs-card__text {
  width: 100% !important;
  background: rgba(var(--vs-background), 0.2) !important;
  backdrop-filter: saturate(180%) blur(20px) !important;
}
.vs-avatar-content.history {
  padding-bottom: 3px;
}
.delImg {
  background: rgb(0, 0, 0, 0.2);
  padding: 5px;
  border-radius: 10rem;
  position: absolute;
  right: 30px;
  margin-top: 10px;
}
.addpost textarea {
  background: rgb(var(--vs-theme));
  border-radius: 15px;
  border: none;
  resize: none;
  padding: 10px;
  width: 100% !important;
  color: rgb(var(--vs-dark));
}
/* ------------------------------------------------'mobile'------------------------------------------------ */
@media screen and (max-width: 600px) {
}
/* ------------------------------------------------'tablet'------------------------------------------------ */
@media screen and (min-width: 600px) and (max-width: 992px) {
}
/* ------------------------------------------------'desktop'------------------------------------------------ */
@media (min-width: 992px) {
  .addpost .vs-dialog {
    max-width: 200px !important;
  }
}
</style>