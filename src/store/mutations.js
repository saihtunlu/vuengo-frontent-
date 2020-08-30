export default {
    setCurrentUser(state, data) {
        state.user = data;
        localStorage.setItem('user', JSON.stringify(data))
    },
    clearUserData() {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");
        window.location.reload();
    },
    isLoggedIn(state, data) {
        state.isLoggedIn = data
    }
    , setActiveIndex(state, data) {
        state.activeIndex = data
    },
    setPosts(state, data) {
        state.posts = data
        state.isReady = true
    }
}