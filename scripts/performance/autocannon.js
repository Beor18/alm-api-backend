const autocannon = require('autocannon');
const config = require('../../config/index');

const instance = autocannon({
    url: `http://localhost:${config.port}/api/v1/coronavirus`,
    method: 'GET',
    connections: 800,
    pipelining: 1,
    duration: 3
})

autocannon.track(instance, {renderProgressBar: true})