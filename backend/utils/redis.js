const Redis = require('ioredis');

const redis = new Redis({
    host: 'localhost',
    port: 8080,
});


module.exports = redis;