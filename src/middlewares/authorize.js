const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { getSecretKey } = require('../utils/utils')
const secretKey = getSecretKey()

const checkAuth = (req, res, next) => {
    const bearerToken = req.headers.authorization
    if (!bearerToken) return res.status(401).json({ message: 'Unauthorized: Missing or Invalid Token' })
    const token = bearerToken.split(' ')[1]

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.log(err)
            return res.status(401).json({ message: 'Unauthorized: Missing or Invalid Token' })
        }

        const currentTime = Math.floor(Date.now())
        const exp = decoded.exp + (3600 * 1000)
        
        if (decoded.exp && exp < currentTime) {
            return res.status(401).json({ message: 'Token has expired' })
        }

        req.id = decoded.id
        req.username = decoded.username
        req.email = decoded.email
        req.role = decoded.role
        next()
    })
}

const checkRole = (req, res, next) => {
    const role = req.role
    if (role && role === 'admin') {
        return next()
    }
    return res.status(403).json({ message: 'Forbidden: Access Denied' })
}

const checkUserOwner = (req, res, next) => {
    const userId = req.id
    const userUpdateId = req.params.id

    if (userId && userId === userUpdateId) {
        return next()
    }
    return res.status(403).json({ message: 'Forbidden: Access Denied' })
}

const checkCommentOwner = async (req, res, next) => {
    const username = req.username
    const id = req.params.id

    const comment = await prisma.comment.findUnique({
        where: { id }
    })

    const createdBy = comment.createdBy

    if (createdBy && createdBy === username) {
        return next()
    }
    return res.status(403).json({ message: 'Forbidden: Access Denied' })
}

module.exports = {
    checkAuth,
    checkRole,
    checkUserOwner,
    checkCommentOwner
}