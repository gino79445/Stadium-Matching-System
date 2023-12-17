const pool = require('./db').pool;
const mysql = require('mysql2/promise');

async function authenticateAdmin(email, password) {
    //console.log(email);
    //console.log(password);
    const query = 'SELECT user_id, admin FROM Users WHERE Email = ? AND password = ? AND admin = TRUE';
    const [users] = await pool.query(query, [email, password]);
    //console.log(users[0].user_id);
    //console.log(users[0].admin);
    if (users.length) {
        return {
            
            user_id: users[0].user_id,
            admin: users[0].admin
        };
    } else {
        return null;
    }
}
// Add to Model/admin.js

// Model/admin.js

async function createStadium(adminId, name, category, max_capacity, address, rule,  price, available, bathroom, air_condition, vending, water) {
    const connection = await pool.getConnection();
    
    try {
        await connection.beginTransaction();
	    //console.log(adminId);
        // Insert into Stadiums table
        let query = 'INSERT INTO Stadiums (admin_id, name, category, max_capacity, address, rule, price, availble) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        let [result] = await connection.query(query, [adminId, name, category, max_capacity, address, rule, price, available]);
        const stadiumId = result.insertId;

        // Insert into Equipments table
        query = 'INSERT INTO Equipments (stadium_id, bathroom, air_condition, vending, water) VALUES (?, ?, ?, ?, ?)';
        await connection.query(query, [stadiumId, bathroom, air_condition, vending, water]);

        // Commit the transaction
        await connection.commit();
        connection.release();

        return stadiumId;
    } catch (error) {
        // Rollback the transaction in case of an error
        await connection.rollback();
        connection.release();
        throw error;
    }
}

// Add to Model/admin.js

async function listStadiumsByAdmin(adminId) {
    const query = 'SELECT stadium_id as id, name, address, price, availble, picture, rule, category FROM Stadiums WHERE admin_id = ?';
    const [stadiums] = await pool.query(query, [adminId]);
    return stadiums;
}

module.exports = { authenticateAdmin, createStadium, listStadiumsByAdmin };

