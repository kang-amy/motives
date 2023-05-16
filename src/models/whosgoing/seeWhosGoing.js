const Whosgoing = require("../schema/whosgoing")


const getWhosGoing = async (postid) =>{
    let ret;
    await Whosgoing.findOne({postid:postid}).then( (res) =>{
        ret = res.guests;
    })
    return ret;
}

module.exports = {
    getWhosGoing
}