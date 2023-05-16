const mongoose = require("src/config/mongoose");
const {mongoURL} = require("../utils/CONSTANTS")

//Connect to DB
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then((result) => {
        console.log("connected");
    })
    .catch((error) => {
        console.log(error.message);
    });

module.exports = (mongoose);