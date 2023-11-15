const pool = require('./db').pool;

async function getUser(column, value) {
    try {
        const [[result]] = await pool.query(`SELECT * FROM Users WHERE ${column} = ?`, [value]);

        return result;
    } catch (err) {
        console.log(err);
        return false;
    }
}

async function createUser(email, name, password ,age, gender, badminton, basketball, volleyball ) {
    try {
        const [userResult] = await pool.query(
            'INSERT INTO Users (Email, password, Name, Age, Gender) VALUES (?, ?, ?, ?, ?)',
            [email, password, name, age, gender]
        );

        const userId = userResult.insertId;
        await pool.query(
            'INSERT INTO Level (user_id, Badminton, Basketball, Volleyball) VALUES (?, ?, ?, ?)',
            [userId, badminton || 0, basketball || 0, volleyball || 0]
        );  

        return userId;
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
