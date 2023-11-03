const express = require('express');
const router = express.Router();
const scheduleController = require('../controller/schedule.controller')
const userController = require('../controller/user.controller')


router.post('/user', userController.create)

router.post('/schedule', scheduleController.create)
router.get('/schedule', scheduleController.getAllScheduleCards)
router.get('/schedule/detail', scheduleController.getScheduleCardDetail)

module.exports = router;