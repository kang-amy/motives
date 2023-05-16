const express = require("express")
const {findXUsers} = require("../models/user/searchUsers");
const {getPublicDetails} = require("../models/user/getPublicDetails");
const {usernameToId} = require("../models/user/getPublicDetails");
const SearchRouter = express.Router();

SearchRouter.get('/getpublicuserdetailsusername/:username', async (req, res, next) => {
    const {username} = req.params;
    usernameToId(username).then(async (ID) => {
        const id = ID
        const ret = await getPublicDetails(id);
        next({
            code: 200,
            data: ret
        })
    }).catch((e) => {
        console.log(e)
        next({
            code: 200,
            errors: {error: true}
        })
    });

})

SearchRouter.get('/getpublicuserdetailsid/:id', async (req, res, next) => {
    const {id} = req.params;
    const ret = await getPublicDetails(id);
    next({
        code: 200,
        data: ret
    })
})

SearchRouter.get('/searchusers/:term', async (req, res, next) => {
    const {term} = req.params;
    const NUMUSERS = 5;
    let ret = await findXUsers(term, NUMUSERS);
    next({
        code: 200,
        data: {users: ret}
    })
})

module.exports = {SearchRouter}

