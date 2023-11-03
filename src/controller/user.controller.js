const userService = require('../service/user.service')

const create = async (req, res, next) => {
    try {
        const data = await userService.create()

        return res.status(200).send({
            status: "success",
            data
        });
    } catch (error) {
        console.log(error)
        return res.status(400);
    }
}

const update = async (req, res, next) => {
    try {
        const data = await userService.update()

        return res.status(200).send({
            status: "success",
            data
        });
    } catch (error) {
        console.log(error)
        return res.status(400);
    }
}

module.exports = {
    create
}