const model = require('../Model/feedback');
//const hashPassword = require('../utils/authorization').hashPassword;
require('dotenv').config('../.env');

async function createFeedback (req, res){
    const { type, problem } = req.body;
    console.log(type, problem);
    const userId = req.session.userId;
    const { id } = req.params;
    try{
        const feedback = await model.createFeedback(type, problem, userId , id);
        if(!feedback){
            return res.status(400).json({err: 'Can not create'});
        }
        return res.status(200).json(feedback);
    }catch(err){
        return res.status(500).json({err});
    }    
}

async function InfoFeedback(req, res){
    const { id } = req.params;
    try{
        const feedback = await model.InfoFeedback(id);
        return res.status(200).json(feedback);
    }catch(err){
        return res.status(500).json({err});
    }    
}

module.exports = {
    createFeedback,
    InfoFeedback
}
