const jwt = require('jsonwebtoken')
const secretKey = 'uwqXMX6mdG'

const checkAuth = (req, res, next) => {
    const bearerToken = req.headers.authorization
    if(!bearerToken) return res.status(401).json({ message: 'Unauthorized: Missing or Invalid Token' })
    const token = bearerToken.split(' ')[1]

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.log(err)
            return res.status(401).json({ message: 'Unauthorized: Missing or Invalid Token' })
        }
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

module.exports = {
    checkAuth,
    checkRole
}