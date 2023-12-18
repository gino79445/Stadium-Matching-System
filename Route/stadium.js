const express = require('express');
const router = express.Router();
const controller = require('../Controller/stadium');
const { upload } = require('../utils/multer');
router.use(express.json());

const isAuthenticated = require('../utils/authorization').sessionAuthor; // Adjust path as necessary
router.post('/:category/:stadium_id/:date/:time', isAuthenticated, controller.createActivity);
router.get('/:category/:stadium_id/:date', isAuthenticated, controller.getStadiumAvailability);
router.get('/:category/:stadium_id', isAuthenticated, controller.getStadiumDetails);
router.get('/:category', isAuthenticated, controller.getStadiumList);

module.exports = router;