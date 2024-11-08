const jwt = require('jsonwebtoken');

const config = require('../config/config')
const secret = config.token_secret

function decodeAuth(req) {
    const token = req.headers.authorization
    return jwt.verify(token, config.token_secret);
}

function ensureAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).json({ mensaje: "Autenticación requerida." })
    }

    try {
        decodeAuth(req)
    } catch (error) {
        return res.status(403).json({ mensaje: "Sesión expirada, por favor inicie de nuevo la sesión." })
    }

    next()
}

module.exports = {
    ensureAuth,
    decodeAuth
}