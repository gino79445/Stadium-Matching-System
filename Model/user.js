const pool = require('./db').pool;
const QRcode = require ('qrcode');
async function getUser(column, value) {
    try {
        const [[result]] = await pool.query(`SELECT * FROM Users WHERE ${column} = ?`, [value]);

        return result;
    } catch (err) {
        console.log(err);
        return false;
    }
}

async function createUser(email, name, password ,age, gender, badminton, basketball, volleyball, baseball, tennis, tabletennis, swimming, gym,  self_intro ) {
    try {
        const selfIntroValue = self_intro || null;
        const [userResult] = await pool.query(
            'INSERT INTO Users (Email, password, Name, Age, Gender, Created_at, self_intro) VALUES (?, ?, ?, ?, ?, NOW(), ?)',
            [email, password, name, age, gender, selfIntroValue]
        );

        const userId = userResult.insertId;
        await pool.query(
            'INSERT INTO Level (user_id, Badminton, Basketball, Volleyball, Baseball, Tennis, Tabletennis, Swimming, Gym) VALUES (?, ?, ?, ?)',
            [userId, badminton || 0, basketball || 0, volleyball || 0, baseball || 0, tennis || 0, tabletennis || 0, swimming || 0, gym || 0]
        );  

        return userId;
    } catch (err) {
        console.log(err);
        return false;
    }
}

async function updateUser(id, name, email, self_intro, badminton, basketball, volleyball, tabletennis, baseball, tennis, swimming, gym) {
    try {
        // Update user basic info
        await pool.query(`UPDATE Users SET Name = ?, Email = ?, self_intro = ? WHERE user_id = ?`, [name, email, self_intro, id]);

        // Update sports levels
        await pool.query(`UPDATE Level SET Badminton = ?, Basketball = ?, Volleyball = ?, Tabletennis = ?, Baseball = ?, Tennis = ?, Swimming = ?, Gym = ? WHERE user_id = ?`, [badminton || 0, basketball || 0, volleyball || 0, tabletennis || 0, baseball || 0, tennis || 0, swimming || 0, gym || 0, id]);

        // Uncomment the below line if caching is implemented
        // Cache.deleteCache(`user_id_${id}`);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

// async function updateUser(userId, updates) {
//     try {
//         // Update User table
//         const userFields = ['name', 'email', 'self_intro'];
//         const userUpdates = [];
//         const queryParams = [];

//         for (const field of userFields) {
//             if (updates[field] !== undefined) {
//                 userUpdates.push(`${field} = ?`);
//                 queryParams.push(updates[field]);
//             }
//         }

//         if (userUpdates.length > 0) {
//             const userQuery = `UPDATE Users SET ${userUpdates.join(', ')} WHERE user_id = ?`;
//             queryParams.push(userId);
//             await pool.query(userQuery, queryParams);
//         }

//         // Update Level table
//         const levelFields = ['Badminton', 'Basketball', 'Table_Tennis', 'Baseball', 'Tennis', 'Gym', 'Swimming', 'Volleyball'];
//         const levelUpdates = [];
//         const levelParams = [];

//         for (const field of levelFields) {
//             if (updates[field] !== undefined) {
//                 levelUpdates.push(`${field} = ?`);
//                 levelParams.push(updates[field]);
//             }
//         }

//         if (levelUpdates.length > 0) {
//             const levelQuery = `UPDATE Level SET ${levelUpdates.join(', ')} WHERE user_id = ?`;
//             levelParams.push(userId);
//             await pool.query(levelQuery, levelParams);
//         }

//         // Optional: Clear cache
//         // Cache.deleteCache(`user_id_${userId}`);

//         return true;
//     } catch (err) {
//         console.log(err);
//         return false;
//     }
// }

async function findUserById(userId) {
    try {
        const [users] = await pool.query('SELECT password FROM Users WHERE user_id = ?', [userId]);
        return users.length ? users[0] : null;
    } catch (err) {
        console.error(err);
        throw err; // Rethrow the error so it can be caught by the controller
    }
}

async function updatePassword (userId, newPassword) {
    try {
        await pool.query('UPDATE Users SET password = ? WHERE user_id = ?', [newPassword, userId]);
    } catch (err) {
        console.error(err);
        throw err; // Rethrow the error so it can be caught by the controller
    }
}

async function updateProfilePicture(userId, imageUrl) {
    try {
        await pool.query('UPDATE Users SET picture = ? WHERE user_id = ?', [imageUrl, userId]);
        // Cache.deleteCache(`user_id_${userId}`); // Uncomment if you have cache logic
        return true;
    } catch (err) {
        console.error(err);
        throw err; // Rethrow the error for the controller to handle
    }
}

async function getUserLevel(userId) {
    try {
        const [levels] = await pool.query('SELECT Badminton, Basketball, Volleyball, Baseball, Tabletennis, Swimming, Tennis, Gym FROM Level WHERE user_id = ?', [userId]);
        return levels.length ? levels[0] : {};
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function generateQRCode(data) {
    try {
        return await QRcode.toDataURL(data);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    findUserById,
    updatePassword,
    updateProfilePicture,
    getUserLevel,
    generateQRCode
}
