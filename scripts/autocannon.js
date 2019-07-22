const autocannon = require('autocannon');
const PORT = process.env.PORT || '5000';

autocannon({
    url: `http://localhost:${PORT}/api/hoteles`,
    connections: 20,
    pipelining: 1,
    duration: 10 
}, console.info)