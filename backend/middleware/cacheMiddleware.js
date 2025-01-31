const redis = require('../utils/redis');

exports.cache = async (req, res, next) => {
    const key = req.originalUrl;



    const cachedData = await redis.get(key);
    if (cachedData) {
        return res.status(200).json(JSON.parse(cachedData));
    }


    const originalSend = res.send;
    res.send = (body) => {
        redis.set(key, body, 'EX', 3600);
        originalSend.call(res, body);
    };

    next();
}