const pool = require('./db').pool;

async function gethome() {
    try {
        const query = `
            SELECT a.reservation_id, s.picture, a.stadium_id, a.date, a.timeslot, s.price, a.level,
                   (a.max - COALESCE(COUNT(o.reservation_id), 0)) as remain
            FROM Activity a
            JOIN Stadiums s ON a.stadium_id = s.stadium_id
            LEFT JOIN Order_info o ON a.reservation_id = o.reservation_id
            WHERE a.date >= CURRENT_DATE()
            GROUP BY a.reservation_id
            ORDER BY a.date, a.timeslot`;
        const [activities] = await pool.query(query);
        return activities;
    } catch (err) {
        console.error(err);
        throw err;
    }
}
module.exports = {gethome};
