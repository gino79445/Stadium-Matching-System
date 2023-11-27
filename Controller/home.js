const model = require('../Model/home');
//const hashPassword = require('../utils/authorization').hashPassword;
require('dotenv').config('../.env');

async function Home (req, res){
    
    try {
        const activities = await model.gethome();
        res.json({ activity: activities });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
}

module.exports = {
    Home
}