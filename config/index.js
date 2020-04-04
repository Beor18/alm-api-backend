'use strict'

const pkg = require('../package.json');

const config = {
    db: process.env.MONGODB_URL,
    port: process.env.PORT || 5000,
    socket: {
        coronavirus: process.env.SOCKET_URL_CORONA,
        corona_argentina: process.env.SOCKET_URL_CORONA_ARGENTINA
    }
}

Object.assign(config, { pkg })

module.exports = config