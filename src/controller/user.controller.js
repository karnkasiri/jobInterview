const userService = require('../service/user.service')
const utils = require('../utils/utils')

const create = async (req, res, next) => {
    try {
        const user = req.body
        const username = user.username
        const password = user.password
        const role = user.role
        const email = user.email

        if (!username && !password || !role || !email) {
            return utils.sendResponseError(res, 'Invalid Request: username, password, role and enail is required.')
        }

        const isValidEmail = utils.isValidEmail(email)
        if (!isValidEmail) {
            return utils.sendResponseError(res, 'Invalid Request: invalid enail format.')
        }

        const data = await userService.create(user)

        return res.status(200).send({
            message: "success",
            data
        });
    } catch (error) {
        console.log(error)
        return utils.sendResponseError(res, error.message)
    }
}

const update = async (req, res, next) => {
    try {
        const id = req.params.id
        const dataUpdate = req.body
        if (!id) {
            return utils.sendResError(res, 'Invalid Request: id is required.')
        }
        
        const data = await userService.update(id, dataUpdate)

        return res.status(200).send({
            message: "success",
            data
        });
    } catch (error) {
        console.log(error)
        return utils.sendResponseError(res, error.message)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id
        if (!id) {
            return utils.sendResError(res, 'Invalid Request: id is required.')
        }

        const data = await userService.deleteUser(id)

        return res.status(200).send({
            message: "success",
            data
        });
    } catch (error) {
        console.log(error)
        return utils.sendResponseError(res, error.message)
    }
}

const userInfo = async (req, res, next) => {
    try {
        const id = req.params.id
        if (!id) {
            return utils.sendResError(res, 'Invalid Request: id is required.')
        }

        const data = await userService.userInfo(id)

        return res.status(200).send({
            message: "success",
            data
        });
    } catch (error) {
        console.log(error)
        return utils.sendResponseError(res, error.message)
    }
}

const saveSchedule = async (req, res, next) => {
    try {
        const id = req.params.id
        if (!id) {
            return utils.sendResError(res, 'Invalid Request: id is required.')
        }

        const userId = req.id

        const data = await userService.saveSchedule(id, userId)

        return res.status(200).send({
            message: "success",
            data
        });
    } catch (error) {
        console.log(error)
        return utils.sendResponseError(res, error.message)
    }
}

module.exports = {
    create,
    update,
    deleteUser,
    userInfo,
    saveSchedule
}