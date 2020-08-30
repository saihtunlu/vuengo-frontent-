<template>
  <div class="row mt-0" id="auth">
    <div class="col-12 flex-center">
      <div class="row form">
        <div class="col-lg-6 flex-center p-0">
          <div class="bg-gray flex-center big-radius" style="width:98%;height:98%">
            <img src="../../public/image/reset.svg" alt />
          </div>
        </div>
        <div class="col-lg-6 p-lg-5 p-md-4 flex-center flex-column p-sm-3">
          <h1 class="text-center">Reset Password</h1>
          <form @submit.prevent="onSubmit" class="w-100">
            <vs-input v-model="password" type="password" class="mb-3" placeholder="New Password">
              <template #icon>
                <i class="bx bx-lock-open-alt"></i>
              </template>
            </vs-input>

            <vs-input
              type="password"
              class="mb-3"
              v-model="password_confirm"
              placeholder="New Password Confirmation"
            >
              <template #icon>
                <i class="bx bx-lock-open-alt"></i>
              </template>
            </vs-input>
            <vs-button class="w-100 mb-3" type="submit">
              Send
              <i class="bx bx-loader-circle bx-spin ml-3" v-if="sending"></i>
            </vs-button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      signature: "",
      timestamp: "",
      user_id: "",
      password: "",
      password_confirm: "",
    };
  },
  created() {
    this.user_id = this.$route.query.user_id;
    this.timestamp = this.$route.query.timestamp;
    this.signature = this.$route.query.signature;
  },
  methods: {
    onSubmit() {
      this.sending = true;
      this.$axios
        .post("reset-password/", {
          signature: this.signature,
          timestamp: this.timestamp,
          user_id: this.user_id,
          password: this.password,
        })
        .then(() => {
          this.sending = false;
          this.$vs.notification({
            duration: "none",
            title: "Successfully reset",
            text: `You have reset your password successfully, now you can login with your new password.`,
          });
        })
        .catch((err) => {
          this.sending = false;
          this.$vs.notification({
            color: "danger",
            title: "Error reset",
            text: err.response.data[0],
          });
        });
    },
  },
};
</script>