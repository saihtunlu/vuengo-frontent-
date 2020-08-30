<template>
  <div class="row mt-0" id="auth">
    <div class="col-12 flex-center">
      <div class="row form">
        <div class="col-12 flex-center flex-column">
          <img src="../../public/image/success.svg" class="block my-auto" alt />
          <h1>Successfully Verified</h1>
          <vs-button class="w-100 mb-3" to="/login">Go to login</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    var user_id = this.$route.query.user_id;
    var timestamp = this.$route.query.timestamp;
    var signature = this.$route.query.signature;
    this.verify(user_id, timestamp, signature);
  },
  methods: {
    verify(user_id, timestamp, signature) {
      this.$axios
        .post(`verify-registration/`, {
          user_id: user_id,
          timestamp: timestamp,
          signature: signature,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          this.errorMessage = error.response.data;
        });
    },
  },
};
</script>

<style scoped>
/* ------------------------------------------------'mobile'------------------------------------------------ */
@media screen and (max-width: 600px) {
  .form {
    width: 100% !important;
  }
}
/* ------------------------------------------------'tablet'------------------------------------------------ */
@media screen and (min-width: 600px) and (max-width: 992px) {
  .form {
    width: 50% !important;
  }
}
/* ------------------------------------------------'desktop'------------------------------------------------ */
@media (min-width: 992px) {
  .form {
    width: 40% !important;
  }
}
</style>