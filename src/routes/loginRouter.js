const express = require("express")
const User = require("../models/schema/user")
const {createUser} = require("../models/user/createUser");
const {sha256} = require("js-sha256");
const {createAccessToken, createRefreshToken} = require("../utils/authentication/jwt");
const LoginRouter = express.Router();
const {jwtSecret} = require("../utils/CONSTANTS")
const {validateRegistrationData} = require("../utils/authentication/register")
const {validateLoginData} = require("../utils/authentication/login")

LoginRouter.post('/register', async (req, res, next) => {
    req.body.email = req.body.email.replace(/^\s+|\s+$/gm,'');
    req.body.username = req.body.username.replace(/^\s+|\s+$/gm,'');
    const {errors, isValid} = await validateRegistrationData(req.body)

    if (!isValid) {
       return next({
            code: 400,
            errors: errors
        });
    }

    createUser(req.body)
        .then(() => next({
            code: 200
        }))
        .catch(err => {
            next({
                code: 400,
                errors: {
                    error: err
                }
            });
        })
})

LoginRouter.post('/login', async (req, res, next) => {
    const {errors, isValid} = await validateLoginData(req.body);
    if (!isValid) {
        return next({
            code: 400,
            errors: errors
        });
    }
    const email = req.body.email.toLowerCase()
    const password = req.body.password
    User.findOne({email}).then(async user => {
        if (!user) return next({
            code: 400,
            errors: {
                email: "Email not Found"
            }
        });
        if (sha256(password) === user.password) {
            const accessToken = await createAccessToken(user.id, user.username, user.email);
            const refreshToken = await createRefreshToken(user.id, user.username, user.email, user.password)
            next({
                code: 200,
                data: {accessToken, refreshToken}
            });
        }
        next({
            code: 400,
            errors: {
                password: "Incorrect password"
            }
        });
    })
})

LoginRouter.get('/forget', (req, res, next) => {
    res.send(200);
})

module.exports = {LoginRouter}