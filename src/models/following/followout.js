const Following = require("../schema/following")
const {updateFollowingData} = require("./followin");
const {getFollowingData} = require("./followin");

const getFollowing = async (id) =>{
    let following = await getFollowingData(id);
    return following.following;
}

const unfollow = async (unfollower, unfollowee) =>{
    let newUnfollowerFollowing = await getFollowingData(unfollower)
    newUnfollowerFollowing.following = newUnfollowerFollowing.following.filter(follower => follower !== unfollowee)
    await updateFollowingData(unfollower,newUnfollowerFollowing)
}


module.exports = {
    getFollowing,
    unfollow,
}