const commentService = require('../service/comment.service')
const utils = require('../utils/utils')

const create = async (req, res, next) => {
    try {
        const comment = req.body
        const text = comment.text
        const scheduleId = comment.scheduleId

        if (!text && !scheduleId) {
            return utils.sendResponseError(res, 'Invalid Request: text or scheduleId is required.')
        }

        comment.createdBy = req.username
        comment.updatedBy = req.username

        const data = await commentService.create(comment)

        return res.status(200).send({
            status: "success",
            data
        });
    } catch (error) {
        console.log(error)
        return res.status(400);
    }
}

module.exports = {
    create
}