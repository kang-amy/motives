const mongoose = require("../../config/mongoose")
const PointSchema = require("./point")

const PostSchema = new mongoose.Schema({
    userid:{
        type: String,
        require: true
    },
    username:{
        type: String,
        require: true
    },
    useremail:{
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    group: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    postDate: {
        type: Date,
        default: Date.now()
    },
    eventStart:{
        type: Date,
        require: true
    },
    eventEnd:{
        type: Date,
        require: true
    },
    location: {
        type: PointSchema,
        index: '2dsphere',
        require: true
    },
    seeWhosGoing:{
        type:Boolean,
        require: true,
    },
    address: {
        type: String,
        require: true,
    }
})

module.exports = Post = mongoose.model("post", PostSchema)