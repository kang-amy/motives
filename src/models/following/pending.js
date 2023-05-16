const Following = require("../schema/following")
const {updateFollowingData} = require("./followin");
const {getFollowingData} = require("./followin");

const addFollowRequest = async (requester, requestee) => {
    let newRequesterFollowing = await getFollowingData(requester)
    let newRequesteeFollowing = await getFollowingData(requestee)

    //Check if already following or pending
    if (newRequesterFollowing.following.indexOf(requestee) !== -1) return;
    if (newRequesterFollowing.pendingOut.indexOf(requestee) !== -1) return;
    if (newRequesteeFollowing.followers.indexOf(requester) !== -1) return;
    if (newRequesteeFollowing.pendingIn.indexOf(requester) !== -1) return;
    //Add pendings
    newRequesterFollowing.pendingOut.push(requestee);
    newRequesteeFollowing.pendingIn.push(requester);


    //update
    await updateFollowingData(requester,newRequesterFollowing);
    await updateFollowingData(requestee,newRequesteeFollowing);
}

const acceptRequest = async (requestee, requester) => {
    let newRequesterFollowing = await getFollowingData(requester)
    let newRequesteeFollowing = await getFollowingData(requestee)

    //check if there is a request
    if (newRequesteeFollowing.pendingIn.indexOf(requester) === -1) return;

    //remove request and add follower
    newRequesteeFollowing.pendingIn = newRequesteeFollowing.pendingIn.filter(id => id !== requester)
    newRequesteeFollowing.followers.push(requester);

    //remove request of requestee and add following
    newRequesterFollowing.pendingOut = newRequesterFollowing.pendingOut.filter(id => id !== requestee)
    newRequesterFollowing.following.push(requestee);

    await updateFollowingData(requester,newRequesterFollowing);
    await updateFollowingData(requestee,newRequesteeFollowing);
}

const denyRequest = async (requestee, requester) => {
    let newRequesterFollowing = await getFollowingData(requester)
    let newRequesteeFollowing = await getFollowingData(requestee)

    newRequesteeFollowing.pendingIn = newRequesteeFollowing.pendingIn.filter(id => id !== requester)
    newRequesterFollowing.pendingOut = newRequesterFollowing.pendingOut.filter(id => id !== requestee)

    await updateFollowingData(requester,newRequesterFollowing);
    await updateFollowingData(requestee,newRequesteeFollowing);
}

const getPendingIn = async (id) =>{
    let data = await getFollowingData(id);
    return data.pendingIn;
}

const getPendingOut = async (id) => {
    let data = await getFollowingData(id);
    return data.pendingOut;
}

const isPendingIn = async (id, otherUser) =>{
    let data = await getFollowingData(id);
    return data.pendingIn.indexOf(otherUser) !== -1;
}
module.exports = {
    isPendingIn,
    addFollowRequest,
    acceptRequest,
    denyRequest,
    getPendingIn,
    getPendingOut
}
