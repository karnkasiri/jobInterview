const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


const create = async () => {
    try {

        const newUser = await prisma.user.create({
            data: {
                username: "User123",
                password: "1234",
                email: "user@email.com",
                role: "admin"
            },
        });
        return newUser

    } catch (error) {
        console.log(error)
    }
}

const update = async () => {
    try {

        const newUser = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                username: "User123"
            },
        });
        return newUser

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    create,
    update
}