const jwt = require("jsonwebtoken");
const {sha256} = require("js-sha256");
const {createAccessToken} = require("../utils/authentication/jwt");
const {jwtSecret} = require("../utils/CONSTANTS")
const jwtMiddleware = (request, response, next) => {

    let accessToken = getAccessTokenFromHeader(request);
    try {
        const tokenPayload = jwt.verify(accessToken, jwtSecret);
        request.body.user = tokenPayload;
        next();
    } catch (e) {
        const refreshToken = request.headers.refreshtoken;
        try {
            if (!refreshToken) throw new Error

            const payload = jwt.verify(refreshToken, jwtSecret);
            if (payload.type !== 'refresh') throw new Error

            User.findOne({email: payload.email}).then(async user => {
                if (!user) throw new Error

                if (payload.hash !== sha256(user.password + jwtSecret)) throw new Error

                let accessToken = await createAccessToken(user.id, user.username, user.email);
                let tokenPayload = jwt.verify(accessToken, jwtSecret);

                request.body.user = tokenPayload;
                request.body.newAccessToken = accessToken;

                next();
            }).catch ((e) => {
                response.status(403).send('Invalid Token')
            })
        } catch (e) {
            response.status(403).send('Invalid Token')
        }
    }
}

const getAccessTokenFromHeader = (req) => {
    let token = '';
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
        token = req.headers.authorization.split(' ')[1];
    return token;
}
module.exports = {jwtMiddleware}