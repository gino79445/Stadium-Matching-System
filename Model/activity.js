const pool = require('./db').pool;

async function getActivityByCategory(userId, category) {
    const Query = `
        SELECT  A.reservation_id AS id, S.picture, S.name, A.title, A.timeslot as time, S.price, A.level, S.address,S.category,
                coalesce((A.max - COUNT(O.reservation_id)),0) AS remain, date_format(A.date,"%Y-%m-%d") AS date
        FROM Activity AS A
        INNER JOIN Stadiums AS S ON S.stadium_id = A.stadium_id
        INNER JOIN TimeSlots AS T ON T.timeslot_id = A.timeslot
        INNER JOIN Order_info AS O ON O.reservation_id = A.reservation_id
        INNER JOIN Users AS U ON U.user_id = O.user_id
        INNER JOIN Level AS L ON L.user_id = U.user_id
        WHERE (A.date > DATE(CONVERT_TZ(NOW(), 'UTC', 'Asia/Taipei'))
                OR (A.date = DATE(CONVERT_TZ(NOW(), 'UTC', 'Asia/Taipei'))) AND T.start_time >= TIME(CONVERT_TZ(NOW(), 'UTC', 'Asia/Taipei')))
        AND A.reservation_id NOT IN (SELECT reservation_id FROM Order_info WHERE user_id = ?)
        AND S.category = ?
        GROUP BY A.reservation_id
        ORDER BY A.reservation_id DESC`;

    const [result] = await pool.query(Query, [userId, category]);
    return result;
}



async function getHomeActivity(userId) {
    try {
        //Badminton | Basketball | Volleyball | Baseball | Tabletennis | Swimming | Tennis | Gym
        const Query = `SELECT Badminton, Basketball, Volleyball, Baseball, Tabletennis, Swimming, Tennis, Gym FROM Level WHERE user_id = ?`;
        const [level] = await pool.query(Query, [userId]);
        const sports = ['Badminton', 'Basketball', 'Volleyball', 'Baseball', 'Tabletennis', 'Swimming', 'Tennis', 'Gym'];
        let category = [];
        for (const sport of sports) {
          if (level[0][sport] >= 1) {
          category.push(sport);
          }
        }
        for (const sport of sports) {
          if (level[0][sport] === 0) {
          category.push(sport);
          }
        }
        // get activity by category
        let activity = [];
        for (const sport of category) {
            const result = await getActivityByCategory(userId, sport);
            activity = activity.concat(result);
        }
        return { activity: activity };
        
    } catch (err) {
        console.log(err);
        throw err;
    }
}


async function getAllActivity(userId) {
    try {
        const Query = `SELECT  A.reservation_id AS id, S.picture, S.category, S.name , A.title, A.timeslot as time, S.price, A.level,S.address,
                        coalesce((A.max - COUNT(O.reservation_id)),0) AS remain, date_format(A.date,"%Y-%m-%d") AS date
                       FROM Activity AS A 
                       INNER JOIN Stadiums AS S on S.stadium_id =  A.stadium_id
                       INNER JOIN TimeSlots AS T on T.timeslot_id = A.timeslot
                       INNER JOIN Order_info AS O on O.reservation_id = A.reservation_id
                       WHERE (A.date > DATE(CONVERT_TZ(NOW(), 'UTC', 'Asia/Taipei')) 
                              OR (A.date =  DATE(CONVERT_TZ(NOW(), 'UTC', 'Asia/Taipei'))) AND T.start_time >= TIME(CONVERT_TZ(NOW(), 'UTC', 'Asia/Taipei')) ) 
                       AND A.reservation_id NOT IN (SELECT reservation_id FROM Order_info WHERE user_id = ?)
                       GROUP BY A.reservation_id
                       ORDER BY A.reservation_id DESC`;  
        const [activity] = await pool.query(Query, [userId]);
        return { activity: activity };
    } catch (err) {
        throw err;
    }
}

async function getActivity(id, userId) {
    try {
        let Query = `SELECT A.timeslot AS time, date_format(A.date,"%Y-%m-%d") AS date, A.note, A.max, A.level, A.title,A.reservation_id AS id, coalesce((A.max - COUNT(O.reservation_id)),0) AS remain,
                            A.host_id AS creator_id, U.Name AS creator_name, U.picture AS creator_picture, 
                            E.water, E.bathroom, E.air_condition, E.vending, S.price AS fee, S.name,S.picture AS stadium_picture, S.stadium_id,
                            (SELECT COUNT(*) FROM Order_info WHERE reservation_id = ?) AS people
                     FROM Activity AS A 
                     LEFT JOIN Stadiums AS S on S.stadium_id =  A.stadium_id
                     LEFT JOIN Users AS U on U.user_id = A.host_id
                     LEFT JOIN Equipments AS E on E.stadium_id = S.stadium_id
                     LEFT JOIN Order_info AS O on O.reservation_id = A.reservation_id
                     WHERE A.reservation_id = ? 
                     ORDER BY A.reservation_id DESC`;
        let [activity] = await pool.query(Query, [id, id]);
        if (activity.length === 0) {
            return { activity: null };
        }
        activity = activity[0]; 
        Query = `SELECT U.user_id, U.Name, U.picture FROM Order_info AS O
                 INNER JOIN Users AS U on U.user_id = O.user_id
                 WHERE O.reservation_id = ?
        `;        
        const [order] = (await pool.query(Query, [id]));
        Query = `SELECT COUNT(*) AS count FROM Order_info WHERE reservation_id = ? AND user_id = ?`;
        const [count] = await pool.query(Query, [id, userId]);
        let Status;
        if (count[0].count === 0) {
            Status = 'joinable';
        } else {
            Status = 'joined';
        }
        const result = {
           
            id: activity.id,
            title: activity.title,
            time: activity.time,
            note: activity.note,
            date: activity.date,
            max: activity.max,
            level: activity.level,
            fee: activity.fee,
            people: activity.people,
            remain: activity.remain,
            status: Status,
            creator: {
                id: activity.creator_id,
                name: activity.creator_name,
                picture: activity.creator_picture
            },
            stadium: {
                id: activity.stadium_id,
                name: activity.name,  
                picture: activity.stadium_picture,
                water: activity.water,
                bathroom: activity.bathroom,
                air_condition: activity.air_condition,
                vending: activity.vending
            },
            users: order
        };
        

        return result;
    } catch (err) {
        console.log(err);  
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
/*
SELECT  A.reservation_id AS id, S.picture, S.name , A.title, A.timeslot as time, S.price, A.level, coalesce((A.max - COUNT(O.reservation_id)),0) AS remain
                       FROM Activity AS A 
                       INNER JOIN Stadiums AS S on S.stadium_id =  A.stadium_id
                       INNER JOIN TimeSlots AS T on T.timeslot_id = A.timeslot
                       INNER JOIN Order_info AS O on O.reservation_id = A.reservation_id
                       WHERE (A.date > DATE(CONVERT_TZ(NOW(), 'UTC', 'Asia/Taipei')) 
                              OR (A.date =  DATE(CONVERT_TZ(NOW(), 'UTC', 'Asia/Taipei'))) AND T.start_time >= TIME(CONVERT_TZ(NOW(), 'UTC', 'Asia/Taipei')) ) 
                       AND A.reservation_id NOT IN (SELECT reservation_id FROM Order_info WHERE user_id = ?)
                       GROUP BY A.reservation_id
                       ORDER BY A.reservation_id DESC
*/


async function myActivity(userId, Status) {

    try {
        if (Status == 'pending') {
            let Query = `SELECT A.reservation_id AS id, S.picture, S.name ,A.title, A.timeslot as time, S.price, A.max, A.level , 
                        (SELECT COUNT(*) FROM Order_info WHERE reservation_id = A.reservation_id) AS people,
                        coalesce((A.max - (SELECT COUNT(*) FROM Order_info WHERE reservation_id = A.reservation_id)),0) AS remain, date_format(A.date,"%Y-%m-%d") AS date
                        FROM Order_info AS O
                        INNER JOIN Activity AS A on A.reservation_id = O.reservation_id
                        INNER JOIN Stadiums AS S on S.stadium_id =  A.stadium_id
                        INNER JOIN TimeSlots AS T on T.timeslot_id = A.timeslot
                        WHERE O.user_id = ? 
                        AND (A.date > DATE(CONVERT_TZ(NOW(), 'UTC', 'Asia/Taipei')) 
                        OR (A.date =  DATE(CONVERT_TZ(NOW(), 'UTC', 'Asia/Taipei'))) AND T.start_time >= TIME(CONVERT_TZ(NOW(), 'UTC', 'Asia/Taipei')) )
                        GROUP BY A.reservation_id
                        ORDER BY A.reservation_id DESC`;
            const [activity] = await pool.query(Query, [userId, Status]);
            return { activity: activity };
        }else if (Status == 'finish') {
            let Query = `SELECT A.reservation_id AS id, S.picture, S.name ,A.title, A.timeslot as time, S.price, A.max, A.level , 
                        (SELECT COUNT(*) FROM Order_info WHERE reservation_id = A.reservation_id) AS people,
                        coalesce((A.max - (SELECT COUNT(*) FROM Order_info WHERE reservation_id = A.reservation_id)),0) AS remain, date_format(A.date,"%Y-%m-%d") AS date
                        FROM Order_info AS O
                        INNER JOIN Activity AS A on A.reservation_id = O.reservation_id
                        INNER JOIN Stadiums AS S on S.stadium_id =  A.stadium_id
                        INNER JOIN TimeSlots AS T on T.timeslot_id = A.timeslot
                        WHERE O.user_id = ? 
                        AND (A.date < DATE(CONVERT_TZ(NOW(), 'UTC', 'Asia/Taipei')) 
                        OR (A.date =  DATE(CONVERT_TZ(NOW(), 'UTC', 'Asia/Taipei'))) AND T.start_time < TIME(CONVERT_TZ(NOW(), 'UTC', 'Asia/Taipei')) )
                        GROUP BY A.reservation_id
                        ORDER BY A.reservation_id DESC`;
            const [activity] = await pool.query(Query, [userId, Status]);
            return { activity: activity };
        }
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
    leaveActivity,
    getHomeActivity
};
