const express = require('express');
const router = express.Router();
const authorization = require('../utils/authorization').sessionAuthor;
const controller = require('../Controller/activity');
router.use(express.json());

router.use(authorization);
router.get('/', controller.getAllActivity);
router.get('/:id', controller.getActivity);

module.exports = router;
