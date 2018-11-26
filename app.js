const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/db');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const hotel = require('./routes/hotel');

const { getLogger, logHandler, terminate } = require('@jwt/utils')

const app = express();
const http = require('http');
const socketIO = require('socket.io');

const server = http.createServer(app);
module.exports.io = socketIO(server);
const socketEvento = require('./config-socket/socketEvento');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');

    next();
});

// Manejo de sesiones
app.use(session({
    secret: 'some-secret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: config,
    })
}));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logHandler);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', hotel);

app.get('/', function(req, res) {
    res.send('Hola');
});

const log = getLogger(__dirname, __filename)
const PORT = process.env.PORT || 5000;

if (!module.parent) {
    server.listen(PORT, () => {
        log.info(`Server funcionando en puerto ${PORT}`);
    })

    process.on('SIGINT', terminate(0, 'SIGINT'))
    process.on('SIGTERM', terminate(0, 'SIGTERM'))
    process.on('uncaughtException', terminate(1, 'uncaughtException'))
    process.on('unhandledRejection', terminate(1, 'unhandledRejection'))
}