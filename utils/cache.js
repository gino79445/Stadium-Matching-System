const redis = require('ioredis');
const client = new redis.Redis({ host: process.env.REDIS_HOST });
const EXPIRE_TIME = 3000;

async function addCache(key, data, params) {

    subdata = params.subdata || undefined;
    expire = params.expire || EXPIRE_TIME;
    resetExpire = params.resetExpire && true;

    key = JSON.stringify(key);
    data = JSON.stringify(data);
    if (subdata)
        client.hset(key, data, JSON.stringify(subdata)).catch((error) => { console.log(error); console.log("HSET cache ERROR"); });
    else
        client.set(key, data).catch((error) => { console.log(error); console.log("SET cache ERROR"); });

    if (resetExpire)
        client.expire(key, `${expire}`).catch((error) => { console.log(error); console.log("EXPIRE cache ERROR"); });
}

async function appendCache(key, data, params) {

    mode = params.mode || 'L';
    expire = params.expire || EXPIRE_TIME;
    resetExpire = params.resetExpire && true;

    key = JSON.stringify(key);
    data = JSON.stringify(data);
    if (mode != 'L' && mode != 'R') {
        throw new Error("in appendCache mode should be L or R");
    }
    if (mode == 'L')
        client.lpush(key, data).catch((error) => { console.log(error); console.log("PUSH cache ERROR"); });
    if (mode == 'R')
        client.rpush(key, data).catch((error) => { console.log(error); console.log("PUSH cache ERROR"); });
    if (resetExpire)
        client.expire(key, `${expire}`).catch((error) => { console.log(error); console.log("EXPIRE cache ERROR"); });
}

async function getCache(key, data = undefined, all = false) {

    var result;
    key = JSON.stringify(key);
    data = JSON.stringify(data);
    if (!data) {
        if (all) {
            result = await client.hgetall(key).catch((error) => { console.log(error); console.log("HGETALL cache ERROR"); });
            return result;
        }
        else
            result = await client.get(key).catch((error) => { console.log(error); console.log("GET cache ERROR"); });
    }
    else {
        result = await client.hget(key, data).catch((error) => { console.log(error); console.log("HGET cache ERROR"); });
    }
    if (result)
        return JSON.parse(result);
    return result;
}

async function getListCache(key, begin = 0, end = -1) {
    var result;
    key = JSON.stringify(key);
    begin = JSON.stringify(begin);
    end = JSON.stringify(end);
    result = await client.lrange(key, begin, end).catch((error) => { console.log(error); console.log("LRANGE cache ERROR"); });
    return result;
}

async function deleteCache(key, user = undefined) {
    key = JSON.stringify(key);
    user = JSON.stringify(user);
    if (!user) {
        client.del(key);
    }
    else {
        client.hdel(key, user).catch((error) => { console.log(error); console.log("HDEL cache ERROR"); });;
    }
};

async function incrCache(increment, key, field = undefined) {
    if (!Number.isInteger(increment)) {
        throw new Error("Increment should be integer in cache.incrCache");
    }
    increment = JSON.stringify(increment);
    if (field)
        client.hincrby(JSON.stringify(key), JSON.stringify(field), increment).catch((error) => { console.log(error); console.log("HINCRBY cache ERROR"); });
    else
        client.incrby(JSON.stringify(key), increment).catch((error) => { console.log(error); console.log("INCRBY cache ERROR"); });
}


module.exports = {
    getCache,
    addCache,
    appendCache,
    deleteCache,
    incrCache,
    getListCache,
    client
};
