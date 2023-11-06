const sendResponseError = (res, msg) => {
    return res.status(400).send({ message: msg })
}

const isValidEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
}

const bcrypt = require('bcrypt')

const generatePasswordHash = async (password) => {
    return await bcrypt.hash(password, 12)
}

const comparePassword = async (password, passwordHash) => {
    return await bcrypt.compare(password, passwordHash)
}

const getSecretKey = () => {
    const secretKey = 'uwqXMX6mdG'
    return secretKey
}


module.exports = {
    sendResponseError,
    isValidEmail,
    generatePasswordHash,
    comparePassword,
    getSecretKey
}