const express = require('express')
const router = express.Router()
const Customer = require('../models/customer')

const crud = require('../middlewares/crud')
const Log = require('../middlewares/addLog')
const { findById } = require('../models/customer')

const applyCrud = () => {
    const {
        create,
        readMany,
        readOne,
        update,
        remove,
        removeAll
    } = crud(Customer)

    router.post('/', create)
    router.get('/', readMany)
    router.get('/:_id', readOne)
    router.patch('/:_id', update)
    router.delete('/:_id', remove)
    router.delete('/', removeAll)

}
applyCrud()



module.exports = router