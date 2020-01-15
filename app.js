require('newrelic');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config/db');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const graphqlServer = require('express-graphql');
const hotel = require('./routes/hotel');
const schema = require('./controllers/v2/schema')

const { getLogger, logHandler, terminate } = require('@jwt/utils')

const app = express();
const http = require('http');
const socketIO = require('socket.io');

const server = http.createServer(app);
module.exports.io = socketIO(server);
const socketEvento = require('./config-socket/socketEvento');

const log = getLogger(__dirname, __filename)
const PORT = process.env.PORT || 5000;

app.use(cors(({exposedHeaders: ['Content-Length', 'X-Total-Count']})));

// Manejo de sesiones
app.use(session({
    secret: 'some-secret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: config,
    })
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logHandler);
// API REST v1
app.use('/api/v1', hotel);

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
    server.listen(PORT, () => {
        log.info(`Server funcionando en puerto ${PORT}`);
    })

    process.on('SIGINT', terminate(0, 'SIGINT'))
    process.on('SIGTERM', terminate(0, 'SIGTERM'))
    process.on('uncaughtException', terminate(1, 'uncaughtException'))
    process.on('unhandledRejection', terminate(1, 'unhandledRejection'))
}