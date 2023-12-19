const pool = require('./db').pool;
async function getStadiumsByCategory(category) {
    try {
        let query;
        let params;

        if (category.toLowerCase() === 'all') {
            query = 'SELECT * FROM Stadiums WHERE availble = 1';
            params = [];
        } else {
            query = 'SELECT * FROM Stadiums WHERE category = ? AND availble = 1';
            params = [category];
        }

        const [stadiums] = await pool.query(query, params);
        return stadiums;
    } catch (err) {
        console.error(err);
        throw err;
    }
}
async function getStadiumAvailability(stadiumId, date) {
    const query = `
            SELECT ts.start_time, 
                   IF(a.date IS NULL, FALSE, TRUE) as booked,
                   COALESCE(SUM(a.max), 0) as people
            FROM TimeSlots ts
            LEFT JOIN Activity a ON ts.timeslot_id = a.timeslot AND a.stadium_id = ? AND a.date = ?
            GROUP BY ts.start_time
            ORDER BY ts.start_time;
        `;
        const [results] = await pool.execute(query, [stadiumId, date]);
        return results;
    }


async function getStadiumDetails(stadiumId) {
    try {
        const queryStadium = 'SELECT name, price, rule FROM Stadiums WHERE stadium_id = ?';
        const [stadiumDetails] = await pool.query(queryStadium, [stadiumId]);

        const queryEquipments = 'SELECT water, bathroom, air_condition, vending FROM Equipments WHERE stadium_id = ?';
        const [equipmentDetails] = await pool.query(queryEquipments, [stadiumId]);

        return stadiumDetails.length ? { ...stadiumDetails[0], ...equipmentDetails[0] } : null;
    } catch (err) {
        console.error(err);
        throw err;
    }
}
async function createActivity(userId, stadiumId, name, people, level, description, date, timeslot) {
    let query = 'INSERT INTO Activity (stadium_id, host_id, title, max, level, note, date, timeslot) VALUES (?, ?, ?, ? , ?, ?, ?, ?)';
    const [result] = await pool.query(query, [stadiumId, userId, name, people, level, description, date, timeslot]);
    query = `INSERT INTO Order_info (reservation_id, user_id) VALUES (?, ?)`;
    await pool.query(query, [result.insertId, userId]);
    return result.insertId;
}

module.exports = {getStadiumsByCategory,getStadiumAvailability,getStadiumDetails,createActivity};
