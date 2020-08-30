<template>
  <div class="row mt-0" id="auth">
    <div class="col-12 flex-center">
      <div class="row form">
        <div class="col-lg-6 flex-center p-0">
          <div class="bg-gray flex-center big-radius" style="width:98%;height:98%">
            <img src="../../public/image/register.svg" alt />
          </div>
        </div>
        <div class="col-lg-6 p-lg-5 p-md-4 flex-center flex-column p-sm-3">
          <h1 class="text-center">Register</h1>
          <form @submit.prevent="Register" class="w-100">
            <vs-input v-model="register.username" class="mb-3" placeholder="User name">
              <template #icon>
                <i class="bx bx-user"></i>
              </template>
              <template v-if="error.username" #message-danger>{{error.username}}</template>
            </vs-input>
            <div class="flex-x-between">
              <vs-input v-model="register.first_name" class="mb-3 mr-3" placeholder="First Name">
                <template #icon>
                  <i class="bx bx-user"></i>
                </template>
              </vs-input>
              <vs-input v-model="register.last_name" class="mb-3" placeholder="Last Name">
                <template #icon>
                  <i class="bx bx-user"></i>
                </template>
              </vs-input>
            </div>
            <vs-input v-model="register.email" class="mb-3" placeholder="Email Address*">
              <template #icon>
                <i class="bx bx-user"></i>
              </template>
              <template v-if="error.email" #message-danger>{{error.email}}</template>
            </vs-input>
            <vs-input
              type="password"
              class="mb-3"
              v-model="register.password"
              placeholder="Password"
            >
              <template #icon>
                <i class="bx bx-lock-open-alt"></i>
              </template>
              <template v-if="error.password" #message-danger>{{error.password}}</template>
            </vs-input>
            <vs-input
              type="password"
              class="mb-3"
              v-model="register.password_confirm"
              placeholder="Password Confirmation"
            >
              <template #icon>
                <i class="bx bx-lock-open-alt"></i>
              </template>
              <template v-if="error.password_confirm" #message-danger>{{error.password_confirm}}</template>
            </vs-input>
            <vs-button class="w-100 mb-3" type="submit">Register</vs-button>
          </form>
          <vs-button class="mb-3 w-100" to="/login" transparent>Already have account? Login ...</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      register: {
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        password_confirm: "",
      },
      error: {
        username: null,
        password: null,
        password_confirm: null,
        email: null,
      },
    };
  },
  methods: {
    Register() {
      var data = this.register;
      this.$axios
        .post("register/", {
          username: data.username,
          email: data.email,
          password: data.password,
          password_confirm: data.password_confirm,
          first_name: data.first_name,
          last_name: data.last_name,
        })
        .then(() => {
          this.$vs.notification({
            title: "Successfully registered",
            text: `The account verification link has been sent to your email, please check your email and confirm it.`,
          });
        })
        .catch((err) => {
          this.error = err.response.data;
        });
    },
  },
};
</script>