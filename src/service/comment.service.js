const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const create = async () => {
    try {

        const newComment = await prisma.comment.create({
            data: {
                text: 'comment ja',
                status: 'ACTIVE',
                createdBy: 'User123',
                updatedBy: 'User123',
            },
        });
        return newComment

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    create
}