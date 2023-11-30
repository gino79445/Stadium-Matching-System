const pool = require('./db').pool;

async function createFeedback(type, content, userId, stadiumId) {
  try {
    let selectQuery = `SELECT * FROM Stadiums WHERE stadium_id = ?`;
    const [stadium] = await pool.query(selectQuery, [stadiumId]);
    if (stadium.length === 0) {
      return false;
    }
    let Query = `INSERT INTO Feedback (type, suggestion, stadium_id ) VALUES (?, ?, ?)`;
    const [feedback] = await pool.query(Query, [type, content, stadiumId]);
    return { feedback_id: feedback.insertId }; 
  
  } catch (err) {
    throw err;
  }


}

async function InfoFeedback(id) {
  try {
    let Query = `SELECT E.water, E.bathroom, E.air_condition, E.vending, S.name, S.price AS fee
                FROM Stadiums AS S
                INNER JOIN Equipments AS E on E.stadium_id = S.stadium_id
                WHERE S.stadium_id = ?`;
    let [stadium] = await pool.query(Query, [id]);
    if (stadium.length === 0) {
      return {stadium: null};
    }
    return { stadium: stadium[0] };
  } catch (err) {
      
    throw err;
  }
}

module.exports = {
  createFeedback,
  InfoFeedback
};
