import axios from "../axios";

export default {
  login: async ({ dispatch }, { username, password }) => {
    return await axios
      .post("login/", { username: username, password: password })
      .then((response) => {
        var access = response.data.access;
        var refresh = response.data.refresh;
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);
        dispatch("getUser", { access });
      });
  },
  logout({ commit }) {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("isLoggedIn");
    commit("clearUserData");
  },
  getUser: async ({ commit }, { access }) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
    return await axios.get("/auth/").then((response) => {
      commit("setCurrentUser", response.data);
      window.location.reload();
    });
  },
  getPosts: async ({ commit }) => {
    return await axios.get("/posts/").then((response) => {
      commit("setPosts", response.data.results);
    });
  },

  addPost: async ({ commit, state }, { post }) => {
    var posts = state.posts;
    posts.unshift(post);
    commit("setPosts", posts);
  },
  likePost: async ({ dispatch }, { post_id }) => {
    await axios.post("/like/", { post_id: post_id }).then(() => {
      dispatch("getPosts");
    });
  },
  unlikePost: async ({ dispatch }, { post_id }) => {
    await axios.post("/unlike/", { post_id: post_id }).then(() => {
      dispatch("getPosts");
    });
  },
  likeComment: async ({ dispatch }, { comment_id }) => {
    await axios.post("/like-comment/", { comment_id: comment_id }).then(() => {
      dispatch("getPosts");
    });
  },
  unlikeComment: async ({ dispatch }, { comment_id }) => {
    await axios
      .post("/unlike-comment/", { comment_id: comment_id })
      .then(() => {
        dispatch("getPosts");
      });
  },
  removePost: async ({ dispatch }, { post_id }) => {
    await axios.post("/delete-post/", { post_id: post_id }).then(() => {
      dispatch("getPosts");
    });
  },
  removeComment: async ({ dispatch }, { comment_id }) => {
    await axios
      .post("/remove-comment/", { comment_id: comment_id })
      .then(() => {
        dispatch("getPosts");
      });
  },
  removeReply: async ({ dispatch }, { reply_id }) => {
    await axios
      .post("/remove-comment-reply/", { reply_id: reply_id })
      .then(() => {
        dispatch("getPosts");
      });
  },
};
