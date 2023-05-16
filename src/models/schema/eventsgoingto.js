const mongoose = require("../../config/mongoose")

const  eventsgoingtoSchema = new mongoose.Schema({
    userid:{
        type: String,
        require: true
    },
    posts:{
        type: [String],
    },
})

module.exports = Eventsgoingto = mongoose.model("eventsgoingto", eventsgoingtoSchema)