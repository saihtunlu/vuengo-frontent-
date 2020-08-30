<template>
  <div class="row mt-0" id="auth">
    <div class="col-12 flex-center">
      <div class="row form">
        <div class="col-lg-6 flex-center p-0">
          <div class="bg-gray flex-center big-radius" style="width:98%;height:98%">
            <img src="../../public/image/login.svg" alt />
          </div>
        </div>
        <div class="col-lg-6 p-lg-5 p-md-4 flex-center flex-column p-sm-3">
          <h1 class="text-center">Login</h1>
          <form @submit.prevent="onSubmit" class="w-100">
            <vs-input v-model="username" class="mb-3" placeholder="User name">
              <template #icon>
                <i class="bx bx-user"></i>
              </template>
            </vs-input>

            <vs-input type="password" class="mb-3" v-model="password" placeholder="Password">
              <template #icon>
                <i class="bx bx-lock-open-alt"></i>
              </template>
            </vs-input>
            <vs-button class="w-100 mb-3" type="submit">Login</vs-button>
          </form>

          <div class="flex-x-between w-100">
            <vs-button class="mb-3" to="/register" transparent>Not have account yet? Register ...</vs-button>
            <vs-button class="mb-3" to="/forgot-password" transparent>Forgot Password?</vs-button>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="col-12">
      <h1>Register</h1>
      <form @submit.prevent="Register">
        <vs-input v-model="register.username" placeholder="Username">
          <template #icon>
            <i class="bx bx-user"></i>
          </template>
        </vs-input>
        <vs-input v-model="register.email" placeholder="Email">
          <template #icon>
            <i class="bx bx-user"></i>
          </template>
        </vs-input>
        <vs-input type="password" icon-after v-model="register.password" placeholder="Password">
          <template #icon>
            <i class="bx bx-lock-open-alt"></i>
          </template>
        </vs-input>
        <vs-input
          type="password"
          icon-after
          v-model="register.password_confirm"
          placeholder="Password Confirmation"
        >
          <template #icon>
            <i class="bx bx-lock-open-alt"></i>
          </template>
        </vs-input>
        <vs-button type="submit">Register</vs-button>
      </form>
    </div>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      register: {
        username: "",
        email: "",
        password: "",
        password_confirm: "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("login", {
        username: this.username,
        password: this.password,
      });
    },
    Register() {
      var data = this.register;
      this.$store.dispatch("register", { data });
    },
  },
};
</script>

<style >
#auth {
  margin-top: 0px !important;
  min-height: 100vh;
  background: url("../../public/image/At3.svg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
div#auth .form img {
  width: 60%;
  object-fit: cover;
  border-radius: 25px;
}

/* ------------------------------------------------'mobile'------------------------------------------------ */
@media screen and (max-width: 600px) {
  #auth .form {
    background: rgb(var(--vs-light));
    border-radius: 30px;
    width: 100%;
    min-height: 60vh;
    padding: 15px;
  }
}
/* ------------------------------------------------'tablet'------------------------------------------------ */
@media screen and (min-width: 600px) and (max-width: 992px) {
  #auth .form {
    background: rgb(var(--vs-light));
    border-radius: 30px;
    width: 60%;
    min-height: 40vh;
    padding: 30px;
  }
}
/* ------------------------------------------------'desktop'------------------------------------------------ */
@media (min-width: 992px) {
  #auth .form {
    background: rgb(var(--vs-light));
    border-radius: 30px;
    width: 75%;
    min-height: 60vh;
  }
}
</style>