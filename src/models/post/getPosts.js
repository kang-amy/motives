const GetPosts = require("../schema/post")
const {getGoingTo} = require("../goingto/goingto");
const {getFollowing} = require("../following/followout");
const {isFollowing} = require("../following/followin");

const getFollowingPosts = async (id) =>{
    let ret;
    const following = await getFollowing(id);
    await GetPosts.find({"userid":{$in:following}}).sort({'eventStart': -1}).then((posts)=>{
        ret = posts;
    })
    return ret;
}

const getGoingToPosts = async (id) =>{
    let ret;
    const posts = (await getGoingTo(id)).posts;
    await GetPosts.find({"_id":{$in:posts}}).sort({'eventStart': -1}).then((posts)=>{
        ret = posts;
    })
    return ret;
}


const getUserPosts = async (id) =>{
    let ret;
    await GetPosts.find({"userid":id}).sort({'eventStart': -1}).then((posts)=>{
        ret = posts;
    })
    return ret;
}

const getUserPublicPosts = async (id) =>{
    let ret;
    await GetPosts.find({"userid":id, "group":0}).sort({'eventStart': -1}).then((posts)=>{
        ret = posts;
    })
    return ret;
}



const getPublicPosts = async () =>{
    let ret;
    return GetPosts.find({"group":0}).sort({'eventStart': -1})
}

const getPostDetails = async (userid,id) =>{
    let ret;
    await GetPosts.findOne({"_id":id}).then(async (post)=>{
        if(!(await isFollowing(userid, post.userid)) && post.group !== 0){
            throw Error('asd');
        }
        ret = post;
    })
    return {post:ret};
}



module.exports = {getGoingToPosts,getFollowingPosts,getPublicPosts,getPostDetails,getUserPosts,getUserPublicPosts}
