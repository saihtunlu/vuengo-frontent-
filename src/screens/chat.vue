<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-6 offset-3">
        <div id="chat-container" class="card">
          <div
            class="card-header text-white text-center font-weight-bold subtle-blue-gradient"
          >Share the page URL to invite new friends</div>

          <div class="card-body">
            <div class="container chat-body">
              <div class="flex-align-center chat-section">
                <img class="big-radius mr-4" src="http://placehold.it/40/f16000/fff&text=D" />
                <p class="card-text speech-bubble speech-bubble-peer">Hello!</p>
              </div>
              <div class="flex-align-center flex-end chat-section">
                <p
                  class="card-text speech-bubble speech-bubble-user float-right text-white subtle-blue-gradient"
                >Whatsup, another chat app?</p>
                <img class="big-radius ml-4" src="http://placehold.it/40/333333/fff&text=A" />
              </div>
            </div>
          </div>

          <div class="card-footer text-muted">
            <form>
              <div class="row">
                <div class="col-sm-10">
                  <input type="text" placeholder="Type a message" />
                </div>
                <div class="col-sm-2">
                  <button class="btn btn-primary">Send</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  created() {
    this.$store.commit("setActiveIndex", this.$route.meta.index);
  },
  methods: {},
};
</script>
