const pool = require('./db').pool;
const Cache = require('../utils/cache');

async function getUser(column, value) {
    try {
        if (column == 'id') {
            var cacheKey = `user_${column}_${value}`;
            const cacheData = await Cache.getCache(cacheKey);
            if (cacheData) {
                return cacheData;
            }
        }

        const [[result]] = await pool.query(`SELECT * FROM user WHERE ${column} = ?`, [value]);

        if (column == 'id')
            Cache.addCache(cacheKey, result, { expire: 60 * 60 * 24, resetExpire: true });

        return result;
    } catch (err) {
        console.log(err);
        return false;
    }
}

async function createUser(email, password, name ) {
    try {
        const [result] = await pool.query(`INSERT INTO user (email, password, name) VALUES (?, ?, ?)`, [email, password, name]);
        return result.insertId;
    } catch (err) {
        console.log(err);
        return false;
    }
}

async function updateUser(id, name, self_intro) {
    try {
        await pool.query(`UPDATE user SET name = ?, self_intro = ? WHERE id = ?`, [name, self_intro, id]);
        Cache.deleteCache(`user_id_${id}`);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}


async function updateProfilePicture(user_id, imageUrl) {
    try {
        await pool.query(`UPDATE user SET picture = ? WHERE id = ?`, [imageUrl, user_id]);
        Cache.deleteCache(`user_id_${user_id}`);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    updateProfilePicture
}
