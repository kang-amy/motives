const {createGoingTo} = require("../goingto/goingto");
const createPost = async (post) => {
    await post.save()
    await createGoingTo(post);
    return
}

module.exports = {createPost}