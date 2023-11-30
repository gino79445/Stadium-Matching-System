const express = require('express');
const router = express.Router();
const authorization = require('../utils/authorization').sessionAuthor;
const controller = require('../Controller/event');
router.use(express.json());

router.use(authorization);
router.get('/', controller.getEvent);
router.put('/:id', controller.readEvent);


module.exports = router;

