const express = require('express');
const router = express.Router();
const authorization = require('../utils/authorization').sessionAuthor;
const controller = require('../Controller/home');
router.use(express.json());

router.get('/', controller.Home);

router.use(authorization);

module.exports = router;
