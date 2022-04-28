const jwt = require('jsonwebtoken');
const utils = require('../utils/keys')

const isAuth = async (req, res, next) => {
    let authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.sendStatus(403)
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, utils.keys.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.sendStatus(403)
        }
        req.user = decoded;
        return next();
    })
}

module.exports = {
    isAuth
}