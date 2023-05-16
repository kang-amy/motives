const User = require("../schema/user")

const usernameToId = async (username) =>{
    let ret;

    await User.findOne({username:username}).then( (user)=>{
        ret = user._id;
    })
    return ret;
}

const getPublicDetails = async (id) =>{
    let ret;
    await User.findById(id).then((user)=>{
        const {username,_id,firstname,lastname} = user;
        ret = {
            username,
            firstname,
            lastname,
            id:_id
        }
    })
    return ret
}

module.exports = {
    usernameToId,
    getPublicDetails
}