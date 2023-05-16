const mongoose = require("../../config/mongoose")

const  followingSchema = new mongoose.Schema({
    userid:{
      type: String,
      require: true
    },
    following:{
        type: [String],
        require: true
    },
    followers: {
        type: [String],
        require: true
    },
    pendingOut: {
        type: [String],
        require: true
    },
    pendingIn: {
        type: [String],
        require: true
    },
})

module.exports = Following = mongoose.model("following", followingSchema)