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

module.exports = {
    create
}