const model = require('../Model/event');
//const hashPassword = require('../utils/authorization').hashPassword;
require('dotenv').config('../.env');

async function getEvent (req, res){
    const UserId = req.session.userId;
    try{
        const Event = await model.getEvent(UserId);
        return res.status(200).json(Event);
    }catch(err){
        return res.status(500).json({err});
    }

}

async function readEvent (req, res){
    const { id } = req.params;
    const UserId = req.session.userId;
    try{
        const Event = await model.readEvent(id, UserId);
        return res.status(200).json(Event);
    }catch(err){
        return res.status(500).json({err});
    }

}

module.exports = {
    getEvent,
    readEvent
    
}

