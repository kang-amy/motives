const {getPostDetails} = require("./getPosts");
const {isFollowing} = require("../following/followin")
const canSeeWhosGoing = async (user, postid) =>{
    let ret = await getPostDetails(user, postid);
    if(ret.post.group>0 && !(await isFollowing(user,ret.post.userid))) return false
    return ret.post.seeWhosGoing || user === ret.post.userid;
}

module.exports = {
    canSeeWhosGoing,
}