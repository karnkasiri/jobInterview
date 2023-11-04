const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { generatePasswordHash } = require('../utils/utils')

const create = async (user) => {
    try {
        const passwordHash = await generatePasswordHash(user.password)
        const newUser = await prisma.user.create({
            data: {
                ...user,
                password: passwordHash
            },
        })
        return newUser

    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

const update = async (id, dataUpdate) => {
    try {
        const updateUser = await prisma.user.update({
            where: { id },
            data: dataUpdate,
        })
        return updateUser

    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

const deleteUser = async (id) => {
    try {
        const deleteUser = await prisma.user.delete({
            where: { id }
        })
        return deleteUser

    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

const userInfo = async (id) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id }
        })
        return user

    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

const saveSchedule = async (scheduleId, userId) => {
    try {
        const newUserSchedule = await prisma.userSchedule.create({
            data: {
                scheduleId,
                userId
            }
        })
        return newUserSchedule
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

module.exports = {
    create,
    update,
    deleteUser,
    userInfo,
    saveSchedule
}