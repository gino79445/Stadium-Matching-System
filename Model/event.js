
const pool = require('./db').pool;

async function getEvent(UserId) {
    try {
        let Query = `SELECT E.event_id, E.reservation_id , A.title, E.is_read, S.stadium_id, S.name
                     FROM Event AS E 
                     INNER JOIN Activity AS A on A.reservation_id = E.reservation_id
                     INNER JOIN Stadiums AS S on S.stadium_id = A.stadium_id
                     WHERE E.user_id = ?`;
        
        const [event] = await pool.query(Query, [UserId]);
        const result = {
            event: event.map((item) => {
                return {
                    event_id: item.event_id,
                    stadium_id: item.stadium_id,
                    stadium_name: item.name,
                    reservation_id: item.reservation_id,
                    title: item.title,
                    is_read: item.is_read,
                    message: "The event is about to start"
                };
            })
      };

      return result;

    } catch (err) {
        throw err;
    }
}
async function readEvent(id, UserId) {
    try {
        let Query = `UPDATE Event SET is_read = TRUE WHERE event_id = ? AND user_id = ?`;
        await pool.query(Query, [id, UserId]);
        return { event_id: parseInt(id) };
    } catch (err) {
        throw err;
    }
}
module.exports = {
    getEvent,
    readEvent
};
