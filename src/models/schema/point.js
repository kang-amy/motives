const mongoose = require("../../config/mongoose")

const PointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    // [lat,lng]
    coordinates: {
        type: [Number],
        required: true
    }
});

module.exports = PointSchema