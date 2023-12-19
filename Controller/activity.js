const model = require('../Model/activity');
//const hashPassword = require('../utils/authorization').hashPassword;
require('dotenv').config('../.env');


async function getHomeActivity(req, res){
  const userId = req.session.userId;
  try{
        const activity = await model.getHomeActivity(userId);
        return res.status(200).json(activity);
    }catch(err){
        return res.status(500).json({err});
    }  
    
}



async function getAllActivity(req, res){
  
  try{
        const userId = req.session.userId;
        const activity = await model.getAllActivity(userId);
        return res.status(200).json(activity);
    }catch(err){
        return res.status(500).json({err});
    }
     
}

async function getActivity(req, res){
    const { id } = req.params;
    const userId = req.session.userId;
    try{
        const activity = await model.getActivity(id, userId);
        return res.status(200).json(activity);
    }catch(err){
        return res.status(500).json({err});
    } 
}

async function joinActivity(req, res){
    const { id } = req.params;
    const userId = req.session.userId;
    try{
        const activity = await model.joinActivity(id, userId);
        if(!activity){
            return res.status(400).json({err: 'Already joined'});
        }
        return res.status(200).json(activity);
    }catch(err){
        return res.status(500).json({err});
    } 
}



async function myActivity(req, res){
  const { Status } = req.params;
  const userId = req.session.userId;
  try{
      const activity = await model.myActivity(userId, Status);
      return res.status(200).json(activity);

  }catch(err){
      return res.status(500).json({err});
  }   
}

async function leaveActivity(req, res){
  const { id } = req.params;
  const userId = req.session.userId;
  try{
      const activity = await model.leaveActivity(id, userId);
      if (!activity) {
        return res.status(400).json({ err: 'Can not leave' });
      }
      return res.status(200).json(activity);

  }catch(err){
      return res.status(500).json({err});
  }   
}
module.exports = {
    getAllActivity,
    getActivity,
    myActivity,
    joinActivity,
    leaveActivity,
    getHomeActivity
}
