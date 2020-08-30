<template>
  <div>
    <div class="card shadow">
      <div class="flex-x-between mb-3">
        <div class="flex-align-center">
          <vs-avatar circle class="mr-2 pointer">
            <img
              :src="`http://localhost:8000${post.user.detail.avatar}`"
              v-if="post.user.detail"
              alt
            />
            <img src="https://vuesax.com/avatars/avatar-3.png" v-else alt />
          </vs-avatar>
          <div>
            <p class="mb-0">{{post.user.first_name}} {{post.user.last_name}}</p>
            <span class="sm-text">
              Posted on {{
              $moment(
              post.created_at,
              "YYYY-MM-DDTHH:mm:ss.SSS"
              ).format("DD-MM-YYYY HH:mm")
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
            <vs-button class="w-100" transparent v-if="$store.getters.isOwner(post.user.id)">
              <i class="bx bx-edit-alt mr-2"></i> Edit
            </vs-button>
            <vs-button
              class="w-100"
              transparent
              @click="$store.dispatch('removePost',{post_id:post.id})"
              v-if="$store.getters.isOwner(post.user.id)"
            >
              <i class="bx bx-trash mr-2"></i> Delete
            </vs-button>
          </div>
        </div>
      </div>
      <p class="mb-3">{{post.content}}</p>
      <img
        @click="viewImage(`http://localhost:8000${post.image}`)"
        :src="`http://localhost:8000${post.image}`"
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
            @click="$store.dispatch('unlikePost',{post_id:post.id})"
            v-if="$store.getters.isLiked(post.id)"
          >
            <i class="bx bxs-heart mr-2"></i>
            {{post.likes.length}}
          </vs-button>
          <vs-button
            dark
            transparent
            v-else
            class="mr-3"
            @click="$store.dispatch('likePost',{post_id:post.id})"
          >
            <i class="bx bx-heart mr-2"></i>
            {{post.likes.length}}
          </vs-button>
          <vs-button @click="$router.push({name: 'Post',query:{pid:post.id}})" transparent>
            <i class="bx bx-message-square-detail mr-2"></i>
            {{post.comments.length}}
          </vs-button>
        </div>
        <vs-avatar-group max="4">
          <vs-avatar circle v-for="like in post.likes" size="30" :key="like.id">
            <img
              :src="`http://localhost:8000${like.user.detail.avatar}`"
              v-if="like.user.detail"
              alt
            />

            <img src="https://vuesax.com/avatars/avatar-3.png" v-else alt />
          </vs-avatar>
        </vs-avatar-group>
      </div>
    </div>

    <vs-dialog scroll blur overflow-hidden not-close auto-width v-model="activeComment">
      <div class="con-content">
        <h4>Whats is Vuesax?</h4>
        <p>
          Vuesax (pronounced / vjusacksː /, as view sacks) is a framework of UI components created with Vuejs to make projects easily and with a unique and pleasant style, vuesax is created from scratch and designed for all types of developers from the frontend lover to the backend who wants to easily create their visual approach to the end-user
          We are focused on streamlining the work of the programmer by giving components created in their entirety and with independent customization and very easy to implement, so creativity is in our hands but we do not neglect that each project is different both visually and in its ecosystem
          Vuesax does not have a design line such as other component frameworks based on Material Design, we believe that there are already emaciated frameworks that look visually and in UI / UX and we don't want to be one more of the bunch, apart from that we love to create and design new experiences and surprise you with new elements or details that we can only do by being visually free.
        </p>

        <h4>Why Vuesax?</h4>

        <p>
          Vuesax is a relatively new framework with a refreshing design and in the latest trends, vuesax based on vuejs which means that we go hand in hand with one of the most popular javascript frameworks in the world and with a huge community with which you will have all the help and documentation to create and make your project
          <br />
          <br />- Vuesax, unlike many frameworks, is designed from scratch and we are not anchored to any design line, this is something great since your project is going to be unique and very different from the others
          <br />
          <br />- We are focused on the quick and easy creation of projects giving a beautiful visual line but without forgetting the personalization and independence of the developer
          <br />
          <br />- Vuesax uses native css variables for better customization and production changes such as changing to dark theme or changing the main color of the entire application with few javascript lines
          <br />
          <br />- Vuesax is a frame designed to have a great visual impact and that is always in trend with respect to design.
          <br />
          <br />- An open-source community to create, improve and correct any component or function.
          <br />
          <br />- Independent components to avoid importing unnecessary code.
          <br />
          <br />- Markdown documents for better sustainability.
          <br />
          <br />- and much more.
        </p>
      </div>
    </vs-dialog>

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
  padding: 15px;
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