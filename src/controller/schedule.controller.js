
const scheduleService = require('../service/schedule.service')
const utils = require('../utils/utils')

const create = async (req, res, next) => {
    try {
        const schedule = req.body
        const title = schedule.title
        const status = schedule.status

        if (!title && !status) {
            return utils.sendResError(res, 'Invalid Request: title or status is required.')
        }

        schedule.createdBy = req.username
        schedule.updatedBy = req.username

        const data = await scheduleService.create(schedule)

        return res.status(200).send({
            message: "success",
            data
        });
    } catch (error) {
        console.log(error)
        return res.status(400);
    }
}

const getAllScheduleCards = async (req, res, next) => {
    try {
        const userId = req.id
        const data = await scheduleService.getAllScheduleCards(userId)

        return res.status(200).send({
            message: "success",
            data
        });
    } catch (error) {
        console.log(error)
        return res.status(400);
    }
}

const getScheduleCardDetail = async (req, res, next) => {
    try {
        const id = req.params.id
        if (!id) {
            return utils.sendResError(res, 'Invalid Request: id is required.')
        }

        const username = req.username

        const data = await scheduleService.getScheduleDetail(id, username)

        return res.status(200).send({
            message: "success",
            data: {
                data,
            },
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

        dataUpdate.updatedBy = req.username

        const data = await scheduleService.update(id, dataUpdate)

        return res.status(200).send({
            message: "success",
            data: {
                data,
            },
        });
    } catch (error) {
        console.log(error)
        return res.status(400);
    }
}





module.exports = {
    create,
    update,
    getAllScheduleCards,
    getScheduleCardDetail
}