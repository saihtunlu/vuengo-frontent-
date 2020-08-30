export default {
    isLoggedIn: state => !!state.user,
    isOwner: (state) => (id) => {
        return state.user.id === id;
    },
    getPost: (state) => (id) => {
        return state.posts.filter(data => {
            return parseInt(data.id) === parseInt(id)
        })[0]
    },
    isLiked: (state) => (id) => {
        var post = state.posts.filter(data => {
            return data.id === id
        })[0]
        var check = post.likes.filter(data => {
            return data.user.id === state.user.id
        })
        return check.length > 0 ? true : false;
    },
    isLikedComment: (state) => (data) => {
        var post_id = data.post_id;
        var comment_id = data.comment_id;
        var post = state.posts.filter(data => {
            return data.id === post_id
        })[0]
        if (post) {
            var comment = post.comments.filter(data => {
                return data.id === comment_id
            })[0]
            var check = comment.commentlikes.filter(data => {
                return state.user.id === data.user.id
            })
            return check.length > 0 ? true : false;
        } else {
            return false
        }

    }
}