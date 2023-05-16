const {sha256} = require("js-sha256");
const User = require("../schema/user")
const createUser = async (data) => {
    let user = new User({
        username: data.username.toLowerCase().replace(/^\s+|\s+$/gm,''),
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email.toLowerCase(),
        password: sha256(data.password)
    })
    await user.save()

    let following = new Following({
        userid: user._id,
        following:[],
        followers: [],
        pendingOut: [],
        pendingIn: [],
    })

    return following.save();
}

module.exports = {createUser}
