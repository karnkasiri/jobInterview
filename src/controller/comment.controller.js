const commentService = require('../service/comment.service')


const create = async (req, res, next) => {
    try {
        const data = await commentService.create()

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