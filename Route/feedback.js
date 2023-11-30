const express = require('express');
const router = express.Router();
const authorization = require('../utils/authorization').sessionAuthor;
const controller = require('../Controller/feedback');
router.use(express.json());

router.use(authorization);
router.post('/:id', controller.createFeedback);
router.get('/:id', controller.InfoFeedback);

module.exports = router;
