//crud.js

//const express = require('express')

module.exports = (Collection) => {

  // ======
  // Create
  // ======
  const create = (req, res) => {
    const newEntry = req.body
    try {
      Collection.create(newEntry, (e,newEntry) => {
        if(e) res.sendStatus(500)
        else res.send(newEntry)
      })
    } catch(e) {
      res.send({message: e.message}).status(500)
    }
  }
  
  // =========
  // Read many
  // =========
  const readMany = async (req, res) => {
    let query = res.locals.query || {}
    try {
      Collection.find(query, (e,result) => {
        if(e) res.status(500).send(e)
        else res.send(result)
      })
    } catch(e) {
      res.send({message: e.message}).status(500)
    }
  }

  // ========
  // Read one
  // ========
  const readOne = async (req, res) => {
    const { _id } = req.params
    
    try{
        Collection.findById(_id, (e,result) => {
          if(e) res.status(500).send(e)
          else res.send(result)
      })
    }catch(e) {
      res.send({message: e.message}).status(500)
    }
  }
  
  // ======
  // Update
  // ======

  const update = async(req, res) => {
    const changedEntry = req.body
    console.log('changedEntry', changedEntry)
    try{
      const oldValue = await Collection.findById(req.params._id)
      console.log('oldValue', oldValue)
      await Collection.updateOne({
          _id: req.params._id 
        },{ 
          $set: changedEntry,
          log: []
        },(e) => {
          if (e) res.sendStatus(500)
          else res.sendStatus(200)
      })
    }catch(e){
      res.sendStatus(500)
    }
    
  }
  
  // ======
  // Remove one
  // ======

  const remove = async (req, res) => {
    try {
        await Collection.remove({ _id: req.params._id }, (e) => {
          if (e) res.status(500).send(e)
          else res.sendStatus(200)
        })
    } catch(e) {
      res.status(500).send(e)
    }
  }

  // ======
  // Remove all
  // ======
  
  const removeAll = async (req, res) => {
    try {
        await Collection.deleteMany({}, (e) => {
          if (e) res.status(500).send(e)
          else res.sendStatus(200)
        })
    } catch(e) {
      res.status(500).send(e)
    }
  }

  // ======
  // Routes
  // ======

  // let router = express.Router()

  // router.post('/', create)
  // router.get('/', readMany)
  // router.get('/:_id', readOne)
  // router.patch('/:_id', update)
  // router.delete('/:_id', remove)

  // return router

  return {
    create,
    readMany,
    readOne,
    update,
    remove,
    removeAll
  }

}