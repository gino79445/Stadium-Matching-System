const model = require('../Model/stadium');
require('dotenv').config('../.env');
async function getStadiumList(req, res) {
    const category = req.params.category;
    try {
        const stadiums = await model.getStadiumsByCategory(category);
        res.json({ stadium: stadiums });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getStadiumAvailability(req, res) {
    try {
        const { stadium_id, date } = req.params;
        const timeSlots = await model.getStadiumAvailability(stadium_id, date);

        const availability = timeSlots.reduce((acc, curr) => {
            acc[curr.start_time.substring(0, 5)] = !curr.booked;
            return acc;
        }, {});

        const people = timeSlots.reduce((acc, curr) => acc + Number(curr.people), 0);
        const stadiumDetails = await model.getStadiumDetails(stadium_id);

        res.json({
            data: {
                times: availability,
                people,
                ...stadiumDetails
            }
        });
    } catch (err) {
//        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getStadiumDetails(req, res) {
    const stadiumId = req.params.stadium_id;

    try {
        const stadiumDetails = await model.getStadiumDetails(stadiumId);
        if (!stadiumDetails) {
            return res.status(404).json({ error: 'Stadium not found' });
        }

        res.json(stadiumDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function createActivity(req, res) {
    const { stadium_id, date, time  } = req.params; // Extract from params

    const { name, people, level, description } = req.body;
    const userId = req.session.userId;
    try {
        const activityId = await model.createActivity(userId, stadium_id, name, people, level, description, date, time);
        res.status(201).json({ activity_id: activityId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {getStadiumList,getStadiumAvailability,getStadiumDetails,createActivity};
