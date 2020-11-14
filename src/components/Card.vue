<template>
  <div>
    <div class="card shadow">
      <div class="flex-x-between mb-3">
        <div class="flex-align-center">
          <vs-avatar class="mr-2 pointer">
            <img
              :src="`${post.user.detail.avatar}`"
              v-if="post.user.detail"
              alt
            />
            <img src="https://vuesax.com/avatars/avatar-3.png" v-else alt />
          </vs-avatar>
          <div>
            <p class="mb-0">
              {{ post.user.first_name }} {{ post.user.last_name }}
            </p>
            <span class="sm-text">
              Posted on
              {{
                $moment(post.created_at, "YYYY-MM-DDTHH:mm:ss.SSS").format(
                  "DD-MM-YYYY HH:mm"
                )
              }}
            </span>
          </div>
        </div>
        <div class="drop-down">
          <vs-button transparent>
            <i class="bx bx-dots-horizontal-rounded"></i>
          </vs-button>
          <div class="drop-items">
            <vs-button class="w-100" transparent>
              <i class="bx bx-share-alt mr-2"></i> Share
            </vs-button>
            <vs-button
              class="w-100"
              transparent
              v-if="$store.getters.isOwner(post.user.id)"
            >
              <i class="bx bx-edit-alt mr-2"></i> Edit
            </vs-button>
            <vs-button
              class="w-100"
              transparent
              @click="$store.dispatch('removePost', { post_id: post.id })"
              v-if="$store.getters.isOwner(post.user.id)"
            >
              <i class="bx bx-trash mr-2"></i> Delete
            </vs-button>
          </div>
        </div>
      </div>
      <p class="mb-3">{{ post.content }}</p>
      <img
        @click="viewImage(`${post.image}`)"
        :src="`${post.image}`"
        width="100%"
        class="small-radius mb-3 pointer"
        alt
      />
      <div class="flex-x-between">
        <div class="flex-align-center">
          <vs-button
            danger
            transparent
            class="mr-3"
            @click="$store.dispatch('unlikePost', { post_id: post.id })"
            v-if="$store.getters.isLiked(post.id)"
          >
            <i class="bx bxs-heart mr-2"></i>
            {{ post.likes.length }}
          </vs-button>
          <vs-button
            dark
            transparent
            v-else
            class="mr-3"
            @click="$store.dispatch('likePost', { post_id: post.id })"
          >
            <i class="bx bx-heart mr-2"></i>
            {{ post.likes.length }}
          </vs-button>
          <vs-button
            @click="$router.push({ name: 'Post', query: { pid: post.id } })"
            transparent
          >
            <i class="bx bx-message-square-detail mr-2"></i>
            {{ post.comments.length }}
          </vs-button>
        </div>
        <vs-avatar-group max="4">
          <vs-avatar v-for="like in post.likes" size="30" :key="like.id">
            <img
              :src="`${like.user.detail.avatar}`"
              v-if="like.user.detail"
              alt
            />

            <img src="https://vuesax.com/avatars/avatar-3.png" v-else alt />
          </vs-avatar>
        </vs-avatar-group>
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
export default {
  props: {
    post: {},
  },
  data() {
    return {
      showImage: false,
      image: "",
      activeComment: false,
    };
  },
  methods: {
    viewImage(image) {
      this.image = image;
      this.showImage = true;
    },
  },
};
</script>

<style >
.vs-card {
  max-width: 100% !important;
}
.card {
  padding: 10px;
  background: rgb(var(--vs-background));
  border-radius: 20px;
}
.vs-card__img {
  max-height: 350px !important;
}
.vs-avatar img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: center !important;
}
.drop-items {
  background: rgb(var(--vs-divider));
  position: absolute;
  min-width: 150px !important;
  z-index: 10000;
  border-radius: 20px;
  padding: 5px;
  margin-left: -100px !important;
  display: none;
}
.drop-down:hover .drop-items {
  display: block;
}
</style>