const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const _ = require('lodash')

const create = async (schedule) => {
    try {

        const newSchedule = await prisma.schedule.create({
            data: schedule,
        });
        return newSchedule

    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

const update = async (id, schedule) => {
    try {
        const updateSchedule = await prisma.schedule.update({
            where: { id },
            data: schedule
        })

        const scheduleHistory = await prisma.scheduleHistory.create({
            data: {
                title: updateSchedule.title,
                descrition: updateSchedule.description,
                status: updateSchedule.status,
                createdBy: schedule.updatedBy,
                updatedBy: schedule.updatedBy,
                scheduleId: id
            }
        })

        return updateSchedule

    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

const getAllScheduleCards = async (userId) => {
    try {
        console.log(userId)
        const data = await prisma.schedule.findMany({
            where: {
                users: { every: { userId: { not: userId } } }
            }
        })
        return data

    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

const getScheduleDetail = async (id, username) => {
    try {
        console.log(username)
        const data = await prisma.schedule.findUnique({
            where: {
                id,
            },
            include: {
                comments: true,
                historys: true
            },
        })

        const transformComment = _.map(data.comments, (comment) => {

            if (comment.createdBy != username) {
                return {
                    ...comment,
                    isAllowedEdit: false,
                    isAllowedDelete: false
                }
            }

            return {
                ...comment,
                isAllowedEdit: true,
                isAllowedDelete: true
            }
        })

        return {
            ...data,
            comments: transformComment
        }

    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}


module.exports = {
    create,
    update,
    getAllScheduleCards,
    getScheduleDetail
}