const mongoose = require("../../config/mongoose")

const  whosgoingSchema = new mongoose.Schema({
    postid:{
        type: String,
        require: true
    },
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
    guests:{
        type: [String],
    },
})

module.exports = Whosgoing = mongoose.model("whosgoing", whosgoingSchema)