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

const update = async (req, res, next) => {
    try {
        const id = req.params.id
        const dataUpdate = req.body
        if (!id) {
            return utils.sendResError(res, 'Invalid Request: id is required.')
        }

        const data = await commentService.update(id, dataUpdate)

        return res.status(200).send({
            message: "success",
            data
        });
    } catch (error) {
        console.log(error)
        return utils.sendResponseError(res, error.message)
    }
}

const deleteComment = async (req, res, next) => {
    try {
        const id = req.params.id
        if (!id) {
            return utils.sendResError(res, 'Invalid Request: id is required.')
        }

        const data = await commentService.deleteComment(id)

        return res.status(200).send({
            message: "success",
            data
        });
    } catch (error) {
        console.log(error)
        return utils.sendResponseError(res, error.message)
    }
}

const getComment = async (req, res, next) => {
    try {
        const id = req.params.id
        if (!id) {
            return utils.sendResError(res, 'Invalid Request: id is required.')
        }

        const data = await commentService.getComment(id)

        return res.status(200).send({
            message: "success",
            data
        });
    } catch (error) {
        console.log(error)
        return utils.sendResponseError(res, error.message)
    }
}

module.exports = {
    create,
    getComment,
    update,
    deleteComment
}