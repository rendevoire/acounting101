const { findById, findOne } = require("../models/item")

module.exports = (Collection) => {

    return addLog = async (req, res, next) => {
        const changes = req.body
        try {
            res.send(changes)
            console.log('requesr body', changes)
        } catch(e) {
            res.send({message: e}).status(404)
        }
    }
}