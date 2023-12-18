const express = require('express');
const router = express.Router();
const authorization = require('../utils/authorization').sessionAuthor;
const controller = require('../Controller/admin');
const { upload } = require('../utils/multer');
router.use(express.json());

router.post('/signin', controller.signin);

router.use(authorization);

router.post('/stadium/available', controller.stadiumavailable);
router.get('/stadium/list',controller.listStadiums);
// router.get('/feedback/:feedback_id', controller.stadiumfeedback);
// router.get('/event', controller.event);
// router.post('/event/:feedback_id/read', controller.readevent);
// router.put('/profile/picture', upload.single('picture'), controller.updateProfilePicture);
// router.put('/profile/password', controller.updatePassword);
// router.get('/profile', controller.getUserProfile);

module.exports = router;
