
const scheduleService = require('../service/schedule.service')

const create = async (req, res, next) => {
    try {
        const data = await scheduleService.create()

        return res.status(200).send({
            status: "success",
            data
        });
    } catch (error) {
        console.log(error)
        return res.status(400);
    }
}

const getAllScheduleCards = async (req, res, next) => {
    try {
        const data = await scheduleService.getAllScheduleCards()

        return res.status(200).send({
            status: "success",
            data
        });
    } catch (error) {
        console.log(error)
        return res.status(400);
    }
}

const getScheduleCardDetail = async (req, res, next) => {
    try {
        const id = req.query.id
        const data = await scheduleService.getScheduleDetail(id)

        return res.status(200).send({
            status: "success",
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
    getAllScheduleCards,
    getScheduleCardDetail
}