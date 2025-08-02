const cache = require('apicache');
const redis = require('redis');

let cacheWithRedis;

if (process.env.REDIS_URL) {
  const redisClient = redis.createClient({
    url: process.env.REDIS_URL
  });
  
  cacheWithRedis = cache.options({
    redisClient,
    defaultDuration: 300 // 5 minutos
  }).middleware;
} else {
  cacheWithRedis = cache.middleware;
}

module.exports = cacheWithRedis;