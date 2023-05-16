const User = require("../schema/user")

const findXUsers = async (term, numPeople) =>{
    let ret = [];
    await User.find({"username":{$regex: term, $options: 'i'}}).then((users)=>{
        users.forEach((user)=>{
            ret.push({
                username: user.username,
                id: user._id
            });
        })
    })
    ret.splice(numPeople);
    return ret;

}


module.exports = {
    findXUsers
}