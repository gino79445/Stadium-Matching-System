const pool = require('./db').pool;

async function getAllActivity() {
    try {
        const Query = `SELECT  A.reservation_id AS id, S.picture, S.name  
                       FROM Activity AS A 
                       INNER JOIN Stadiums AS S on S.stadium_id =  A.stadium_id
                       WHERE A.status = 'pending'
                       ORDER BY A.reservation_id DESC`;  
        const [activity] = await pool.query(Query);
        return { activity: activity };
    } catch (err) {
        throw err;
    }
}

async function getActivity(id) {
    try {
        let Query = `SELECT A.timeslot AS time, A.date, A.note, A.max, A.level, 
                            A.host_id AS creator_id, U.Name AS creator_name, U.picture AS creator_picture, 
                            E.water, E.bathroom, E.air_condition, E.vending, S.price AS fee, S.name,
                            (SELECT COUNT(*) FROM Order_info WHERE reservation_id = ?) AS people,
                            A.status
                     FROM Activity AS A 
                     INNER JOIN Stadiums AS S on S.stadium_id =  A.reservation_id
                     INNER JOIN Users AS U on U.user_id = A.host_id
                     INNER JOIN Equipments AS E on E.stadium_id = S.stadium_id
                     WHERE A.reservation_id = ? 
                     ORDER BY A.reservation_id DESC`;
        const [activity] = (await pool.query(Query, [id, id]))[0];
        Query = `SELECT U.user_id, U.Name, U.picture FROM Order_info AS O
                 INNER JOIN Users AS U on U.user_id = O.user_id
                 WHERE O.reservation_id = ?
        `;       
      
        const [order] = (await pool.query(Query, [id]));
        const result = {
            
            time: activity.time,
            note: activity.note,
            max: activity.max,
            level: activity.level,
            fee: activity.fee,
            people: activity.people,
            status: activity.status,
            creator: {
                id: activity.creator_id,
                name: activity.creator_name,
                picture: activity.creator_picture
            },
            stadium: {
                name: activity.name,  
                water: activity.water,
                bathroom: activity.bathroom,
                air_condition: activity.air_condition,
                vending: activity.vending
            },
            users: order
        };
        

        return result;
    } catch (err) {
        throw err;
    }
}  

async function joinActivity(id, userId) { 
    try {
        let Query = `SELECT COUNT(*) AS count FROM Order_info WHERE reservation_id = ? AND user_id = ?`;
        const [count] = await pool.query(Query, [id, userId]);
        if (count[0].count !== 0) {
            return false;
        } 
        Query = `INSERT INTO Order_info (reservation_id, user_id) VALUES (?, ?)`;
        await pool.query(Query, [id, userId]);
        return { activity_id: parseInt(id)  };
    } catch (err) {
        throw err;
    }
} 




async function myActivity(userId, Status) {

    try {
        let Query = `SELECT A.reservation_id AS id, S.picture, S.name  
                     FROM Order_info AS O
                     INNER JOIN Activity AS A on A.reservation_id = O.reservation_id
                     INNER JOIN Stadiums AS S on S.stadium_id =  A.stadium_id
                     WHERE O.user_id = ? AND A.status = ? ORDER BY A.reservation_id DESC`;
        const [activity] = await pool.query(Query, [userId, Status]);
        return { activity: activity };
    } catch (err) {
        throw err;
    }
}

async function leaveActivity(id, userId) {
    try {
        let selectQuery = `SELECT COUNT(*) AS count FROM Order_info WHERE reservation_id = ? AND user_id = ?`;
        const [count] = await pool.query(selectQuery, [id, userId]);
        if (count[0].count === 0) {
            return false;
        }
        let Query = `DELETE FROM Order_info WHERE reservation_id = ? AND user_id = ?`;
        const [activity] = await pool.query(Query, [id, userId]);
        return { activity_id: parseInt(id)  };
    } catch (err) {
        throw err;
    }
}
   


module.exports = {

    getAllActivity,
    getActivity,
    myActivity,
    joinActivity,
    leaveActivity
};
