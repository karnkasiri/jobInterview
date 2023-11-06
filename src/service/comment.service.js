const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const create = async (comment) => {
    try {

        const newComment = await prisma.comment.create({
            data: comment,
        });
        return newComment

    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

const update = async (id, dataUpdate) => {
    try {
        const updateComment = await prisma.comment.update({
            where: { id },
            data: dataUpdate,
        })
        return updateComment

    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

const deleteComment = async (id) => {
    try {
        const deleteComment = await prisma.comment.delete({
            where: { id }
        })
        return deleteComment

    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

const getComment = async (id) => {
    try {
        const comment = await prisma.comment.findUnique({
            where: { id }
        })
        return comment

    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

module.exports = {
    create,
    getComment,
    update,
    deleteComment
}