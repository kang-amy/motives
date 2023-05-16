const mongoose = require("../../config/mongoose")


const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true
    },
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = User = mongoose.model("user", UserSchema)