<template>
  <div class="row">
    <div class="col-12">
      <div class="setting big-radius">
        <div class="flex-center">
          <vs-avatar badge badge-color="warn" circle size="150">
            <img :src="`http://localhost:8000${user.detail.avatar}`" v-if="user.detail" alt />
            <img src="https://vuesax.com/avatars/avatar-3.png" v-else alt />
            <template #badge>
              <i class="bx bx-camera pointer" @click="$refs.inputFile.click()"></i>
              <input type="file" @change="onFileChange" ref="inputFile" hidden />
            </template>
          </vs-avatar>
        </div>
        <h3 class="mb-4">Personal Information</h3>
        <vs-input
          label="First Name"
          class="mb-4"
          v-model="user.first_name"
          placeholder="Enter your first name"
        />
        <vs-input
          label="Last Name"
          class="mb-4"
          v-model="user.last_name"
          placeholder="Enter your first name"
        />
        <vs-button class="w-100">Save Change</vs-button>
        <div class="divider"></div>
        <h3 class="mb-4">Login Information</h3>
        <vs-input
          label="Username (use for login)"
          class="mb-4"
          v-model="user.username"
          placeholder="Enter your username"
        />
        <vs-input
          label="Email Address"
          class="mb-4"
          type="email"
          v-model="user.email"
          placeholder="Enter your email"
        />
        <vs-button class="w-100">Save Change</vs-button>
        <div class="divider"></div>
        <h3 class="mb-4">Change Password</h3>
        <vs-input
          label="Current Password"
          class="mb-4"
          v-model="current_password"
          placeholder="Enter your current password"
        />
        <vs-input
          label="Email Address"
          class="mb-4"
          type="email"
          v-model="new_password"
          placeholder="Enter your new password"
        />
        <vs-button class="w-100" @click="changePw">Save Change</vs-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      current_password: "",
      new_password: "",
    };
  },
  components: {},
  created() {
    this.$store.commit("setActiveIndex", this.$route.meta.index);
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
      e.preventDefault();
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      let formData = new FormData();
      formData.append("avatar", e.target.files[0]);
      if (this.user.detail) {
        formData.append("id", this.user.detail.id);

        this.$axios
          .put("change-avatar/", formData, config)
          .then((response) => {
            var userData = this.user;
            userData.detail.avatar = response.data.avatar;
            this.$store.commit("setCurrentUser", userData);
          })
          .catch(function (err) {
            console.log("addPost -> err", err.response.data);
          });
      } else {
        this.$axios
          .post("upload-detail/", formData, config)
          .then((response) => {
            var userData = this.user;
            userData.detail = response.data;
            this.$store.commit("setCurrentUser", userData);
          })
          .catch(function (err) {
            console.log("addPost -> err", err.response.data);
          });
      }
    },
    changePw() {
      this.$axios
        .put("update-password/", {
          old_password: this.current_password,
          new_password: this.new_password,
        })
        .then((response) => {
          this.$vs.notification({
            title: "Success",
            text: response.data.message,
          });
        })
        .catch((err) => {
          this.$vs.notification({
            title: "Error",
            color: "danger",
            text: err.response.data.old_password[0],
          });
        });
    },
  },
};
</script>
<style>
.vs-avatar__badge.isSlot {
  padding: 7px !important;
  border-radius: 10rem !important;
  margin-bottom: 5px !important;
}
.setting {
  padding: 15px;
  background: rgb(var(--vs-background));
}
</style>

