const model = require('../Model/admin'); // Assuming you have a corresponding model
const hashPassword = require('../utils/authorization').hashPassword;
async function signin(req, res) {

    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).send('Missing email or password');
    }

    try {
        // Authenticate the admin
        
        const adminUser = await model.authenticateAdmin(email, hashPassword(password));

        if (adminUser) {
            // Setting up session or token should be done here
            // For example, req.session.userId = adminUser.user_id; if using express-session
            return res.status(200).json({ user_id: adminUser.user_id, admin: adminUser.admin });
        } else {
            res.status(401).json({ error: 'Authentication failed' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function stadiumavailable(req, res) {
    const userId = req.session.userId;
    const { name, category, max_capacity, address, rule, price, available, bathroom, air_condition, vending, water } = req.body;
    try {
        const stadiumId = await model.createStadium(userId, name, category, max_capacity, address, rule, price, available, bathroom, air_condition, vending, water);
        res.status(201).json({ stadium_id: stadiumId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
// Add or modify in Controller/admin.js

async function listStadiums(req, res) {
    const userId = req.session.userId; // Acquire user_id from the session
    try {
        const stadiums = await model.listStadiumsByAdmin(userId);
        res.json({ stadium: stadiums });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { signin, stadiumavailable, listStadiums };
