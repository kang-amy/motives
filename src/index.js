const express = require("express");
const bodyParser = require('body-parser');
const {LoginRouter} = require("./routes/loginRouter");
const {SearchRouter} = require("./routes/searchRouter")
const {AccountRouter} = require("./routes/accountRouter");
const {PostRouter} = require("./routes/postRouter");
const {FollowRouter} = require("./routes/followRouter");
const {jwtMiddleware} = require("./middleware/jwtMiddleware");

const app = express();
const PORT = process.env.PORT || 3001;

const cors = require("cors")
const logger = require("morgan")
const {responseHandler} = require("./middleware/responseHandler");
const path = require('path');

app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

app.use("/api/authentication", LoginRouter);
app.use("/api/search", SearchRouter);
app.use("/api/", jwtMiddleware)
app.use("/api/account", AccountRouter);
app.use("/api/post", PostRouter);
app.use("/api/follow", FollowRouter);
app.use(responseHandler);
app.use(express.static(path.join(__dirname, './client/build')));

app.get('*', function(req,res) {
    res.sendFile('index.html', {
        root: path.join(__dirname, './client/build/')
    });
});

const server = app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));

