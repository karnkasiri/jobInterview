const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const create = async () => {
    try {

        const newSchedule = await prisma.schedule.create({
            data: {
                title: 'Sample Schedule',
                description: 'This is a sample schedule.',
                status: 'TODO',
                createdBy: 'User123',
                updatedBy: 'User123',
            },
        });
        return newSchedule

    } catch (error) {
        console.log(error)
    }
}

const getAllScheduleCards = async () => {
    try {
        const data = await prisma.schedule.findMany()
        return data

    } catch (error) {
        console.log(error)
    }
}

const getScheduleDetail = async (id) => {
    try {
        const data = await prisma.schedule.findUnique({
            where: {
                id,
            },
            include: {
                comments: true,
            },
        })

        return data

    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    create,
    getAllScheduleCards,
    getScheduleDetail
}