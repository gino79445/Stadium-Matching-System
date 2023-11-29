const pool = require('./db').pool;

async function getAllActivity() {
    try {
        const Query = `SELECT  A.reservation_id AS id, S.picture, S.name  
                       FROM Activity AS A 
                       INNER JOIN Stadiums AS S on S.stadium_id =  A.reservation_id`;  
        const [activity] = await pool.query(Query);
        return activity[0];
    } catch (err) {
        throw err;
    }
}

async function getActivity(id) {
    try {
        let Query = `SELECT A.timeslot AS time, A.date, A.note, A.max, A.level, 
                            A.host_id AS creator_id, U.Name AS creator_name, U.picture AS creator_picture, 
                            E.water, E.bathroom, E.air_condition, E.vending, S.price AS fee,
                            (SELECT COUNT(*) FROM Order_info WHERE reservation_id = ?) AS people
                     FROM Activity AS A 
                     INNER JOIN Stadiums AS S on S.stadium_id =  A.reservation_id
                     INNER JOIN Users AS U on U.user_id = A.host_id
                     INNER JOIN Equipments AS E on E.stadium_id = S.stadium_id
                     WHERE A.reservation_id = ?`;
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
            fee: activity.fee,
            people: activity.people,
            users: order
        };
        

        return result;
    } catch (err) {
        throw err;
    }
}  


module.exports = {
    getAllActivity,
    getActivity  
};
