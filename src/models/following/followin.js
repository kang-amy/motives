const Following = require("../schema/following")

const getFollowingData = async (id) => {
    let data;
    await Following.findOne({userid: id}).then((following) => {
        data = following;
    })
    return data;
}

const updateFollowingData = async (id, data) =>{
    await Following.updateOne({userid:id}, data)
}
const getFollowers = async (id) => {
    let following = await getFollowingData(id);
    return following.followers;
}

const removeFollower = async (remover, removee) => {
    let newRemoverFollowing = await getFollowingData(remover);
    newRemoverFollowing.followers = newRemoverFollowing.followers.filter(follower => follower !== removee)
    await updateFollowingData(remover,newRemoverFollowing)
}

const isFollowing = async (follower, followee) =>{
    if(follower===followee) return true;
    let data = await getFollowingData(follower);

    return data.following.indexOf(followee) !== -1;
}

module.exports = {
    getFollowers,
    removeFollower,
    getFollowingData,
    updateFollowingData,
    isFollowing
}