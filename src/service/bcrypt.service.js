const bcrypt = require('bcrypt')

const generatePasswordHash = async (password) => {
    return await bcrypt.hash(password, 12)
}

const comparePassword = async (password, passwordHash) => {
    return await bcrypt.compare(password, passwordHash)
}

module.exports = {
    generatePasswordHash,
    comparePassword
}