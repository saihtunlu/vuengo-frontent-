<template>
  <div class="row mt-0" id="auth">
    <div class="col-12 flex-center">
      <div class="row form">
        <div class="col-lg-6 flex-center p-0">
          <div class="bg-gray flex-center big-radius" style="width:98%;height:98%">
            <img src="../../public/image/forgot.svg" alt />
          </div>
        </div>
        <div class="col-lg-6 p-lg-5 p-md-4 flex-center flex-column p-sm-3">
          <h1 class="text-center">Forgot Password</h1>
          <form @submit.prevent="onSubmit" class="w-100">
            <vs-input v-model="login" class="mb-3" placeholder="User name">
              <template #icon>
                <i class="bx bx-user"></i>
              </template>
              <template v-if="error.login" #message-danger>{{error.login}}</template>
            </vs-input>

            <vs-input type="email" class="mb-3" v-model="email" placeholder="Email">
              <template #icon>
                <i class="bx bx-mail-send"></i>
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
      sending: false,
      login: "",
      email: "",
      error: {},
    };
  },
  methods: {
    onSubmit() {
      this.sending = true;
      this.$axios
        .post("send-reset-password-link/", {
          login: this.login,
          email: this.email,
        })
        .then(() => {
          this.sending = false;
          this.$vs.notification({
            title: "Successfully registered",
            text: `The password reset link has been sent to your email, please check your email.`,
          });
        })
        .catch((err) => {
          this.sending = false;
          this.error = err.response.data;
        });
    },
  },
};
</script>