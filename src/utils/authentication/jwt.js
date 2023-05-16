const jwt = require("jsonwebtoken");
const {sha256} = require("js-sha256");
const EXPIRY_TIME = 15*60;
const {jwtSecret} = require("../CONSTANTS")


const createAccessToken = async (id, username, email) => {
    const type = 'access'
    const payload = {type,id, username,email}
    const accessToken = jwt.sign(
        payload,
        jwtSecret,
        {expiresIn: EXPIRY_TIME}
    );

    return accessToken;
}

const createRefreshToken = async (id, username, email, password) =>{
    const hash = sha256(password+jwtSecret);
    const type = 'refresh';
    const payload = {type,id, username, email, hash}

    const refreshToken = jwt.sign(
        payload,
        jwtSecret
    );

    return refreshToken;
}

module.exports = {createAccessToken,createRefreshToken}