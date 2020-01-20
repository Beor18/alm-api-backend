const autocannon = require('autocannon');
const config = require('../../config/index');

autocannon({
    url: `http://localhost:${config.port}/api/v1/hoteles`,
    connections: 20,
    pipelining: 1,
    duration: 10 
}, console.info)