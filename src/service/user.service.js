const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { generatePasswordHash } = require('./bcrypt.service')

const create = async () => {
    try {
        const passwordHash = await generatePasswordHash("1234")
        const newUser = await prisma.user.create({
            data: {
                username: "user12345",
                password: passwordHash,
                email: "user2@email.com",
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