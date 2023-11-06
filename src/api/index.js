const express = require('express')
const router = express.Router()
const scheduleController = require('../controller/schedule.controller')
const userController = require('../controller/user.controller')
const commentController = require('../controller/comment.controller')
const {
    checkAuth,
    checkRole,
    checkUserOwner,
    checkCommentOwner
} = require('../middlewares/authorize')


router.post('/user', userController.create)

router.use('/*', checkAuth, checkRole)

//User API
router.get('/user/:id', checkUserOwner, userController.userInfo)
router.put('/user/:id', checkUserOwner, userController.update)
router.delete('/user/:id', checkUserOwner, userController.deleteUser)
router.post('/user/schedule/:id', userController.saveSchedule)

//Schedule API
router.post('/schedule', scheduleController.create)
router.get('/schedule', scheduleController.getAllScheduleCards)
router.get('/schedule/detail/:id', scheduleController.getScheduleCardDetail)
router.put('/schedule/:id', scheduleController.update)
router.delete('/schedule/:id', scheduleController.deleteSchedule)

//Comment API
router.post('/comment', commentController.create)
router.get('/comment/:id', commentController.getComment)
router.put('/comment/:id', checkCommentOwner, commentController.update)
router.delete('/comment/:id', checkCommentOwner, commentController.deleteComment)

module.exports = router;