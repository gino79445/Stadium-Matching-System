
const pool = require('./db').pool;

async function getEvent(UserId) {
    try {
        let Query = `SELECT  A.reservation_id , A.title,  S.stadium_id, S.name ,O.read
                      FROM Order_info AS O
                      INNER JOIN Activity AS A on A.reservation_id = O.reservation_id
                      INNER JOIN Stadiums AS S on S.stadium_id = A.stadium_id
                      INNER JOIN TimeSlots AS T on T.timeslot_id = A.timeslot
                      WHERE O.user_id = ?
                      AND (CONVERT_TZ(NOW(), 'UTC', 'Asia/Taipei') + INTERVAL 60 MINUTE) > CONCAT(A.date, ' ', T.start_time)
                      ORDER BY A.reservation_id DESC
        `;

        const [event] = await pool.query(Query, [UserId]);
        const result = {
            event: event.map((item) => {
                return {
                    stadium_id: item.stadium_id,
                    stadium_name: item.name,
                    reservation_id: item.reservation_id,
                    title: item.title,
                    is_read: item.read,
                    message: "The activity is about to start"
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
        let Query = `UPDATE Order_info SET \`read\` = TRUE WHERE reservation_id = ? AND user_id = ?`;
        const [result] = await pool.query(Query, [id, UserId]);
        if (result.affectedRows === 0) {
            return false;
        }
        return { order_id: parseInt(id) };
    } catch (err) {
        throw err;
    }
}
module.exports = {
    getEvent,
    readEvent
};
