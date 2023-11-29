const express = require('express');
const router = express.Router();
const authorization = require('../utils/authorization').sessionAuthor;
const controller = require('../Controller/activity');
router.use(express.json());

router.use(authorization);
router.get('/', controller.getAllActivity);
router.get('/:id', controller.getActivity);
router.post('/join/:id', controller.joinActivity);
router.get('/my/:Status', controller.myActivity);
router.delete('/leave/:id', controller.leaveActivity);
module.exports = router;
