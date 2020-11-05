const express = require('express')
const router = express.Router()
const Item = require('../models/item')

//get all
router.get('/', async (req, res) => {
    try {
        const items = await Item.find()
        res.json(items)
    } catch(err) {
        res.sendStatus(500)
    }
})

//create one
router.post('/', async (req, res) => {
    const item = new Item({
        name: req.body.name,
        type: req.body.type
    })

    try{
        const newItem = await item.save()
        res.send(newItem).status(200)
    }catch(err) {
        res.send(err).status(400)
    }
})

//delete one
router.delete('/:id', async(req, res) => {

    const item = Item.findById(req.params.id)
    if(item == null){
        return res.send('Cannot find item').status(404)
    }

    try{
        await item.remove()
        res.json({ message: 'item has been removed'})
    }catch(err) {
        res.status(500).send({ message: err.message})
    }
})

module.exports = router