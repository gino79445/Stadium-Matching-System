const model = require('../Model/activity');
//const hashPassword = require('../utils/authorization').hashPassword;
require('dotenv').config('../.env');

async function getAllActivity(req, res){
    
  try{
        const activity = await model.getAllActivity();
        return res.status(200).json(activity);
    }catch(err){
        return res.status(500).json({err});
    }
     
}

async function getActivity(req, res){
    const { id } = req.params;
    try{
        const activity = await model.getActivity(id);
        return res.status(200).json(activity);
    }catch(err){
        return res.status(500).json({err});
    } 
}
module.exports = {
    getAllActivity,
    getActivity
}
