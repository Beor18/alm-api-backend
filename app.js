require('newrelic');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const configDb = require('./config/db');
const config = require('./config');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const graphqlServer = require('express-graphql');
const hotel = require('./routes/hotel');
const coronavirus = require('./routes/coronavirus');
const schema = require('./controllers/v2/schema');

const { getLogger, logHandler, terminate } = require('@jwt/utils')

const app = express();
const http = require('http');
const socketIO = require('socket.io');

const server = http.createServer(app);
module.exports.io = socketIO(server);
const socketEvento = require('./config-socket/socketEvento');

const log = getLogger(__dirname, __filename)

app.use(cors(({exposedHeaders: ['Content-Length', 'X-Total-Count']})));

// Manejo de sesiones
app.use(session({
    secret: 'some-secret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: configDb,
    })
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logHandler);
// API REST v1
app.use('/api/v1', hotel);
app.use('/api/v1', coronavirus);

// API v2 con GraphQL
app.use('/api/v2/graphql', graphqlServer({
    schema: schema,
    graphiql: true
}));

app.disable('etag');
app.disable('x-powered-by');

app.get('/', (req, res) => {
    res.send('Hola api rest de Hoteles! creado por Fernando López');
});

if (!module.parent) {
    server.listen(config.port, () => {
        log.info(`Server funcionando en puerto ${config.port}`);
    })

    process.on('SIGINT', terminate(0, 'SIGINT'))
    process.on('SIGTERM', terminate(0, 'SIGTERM'))
    process.on('uncaughtException', terminate(1, 'uncaughtException'))
    process.on('unhandledRejection', terminate(1, 'unhandledRejection'))
}