const express = require('express')
const router = express.Router()
const Employee = require('../models/employee')

// Get all employees
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find()
        res.json(employees)
    } catch(err) {
        res.sendStatus(500).json({ message: err.message })
    }
})

// Getting one
router.get('/:id', getEmployee, (req, res) => {
    res.json(res.employee)
})

// Creating one
router.post('/', async (req, res) => {
    const employee = new Employee({
        name: req.body.name,
        address: req.body.address
    })

    try {
        const newEmployee = await employee.save()
        res.send(newEmployee).status(200)
    } catch(err) {
        res.send({ message: err.message }).status(400)
    }
    
})

// Updating one
router.patch('/:id', getEmployee, async (req, res) => {
    if(req.body.name != null) {
        res.employee.name = req.body.name
    }
    if(req.body.address != null) {
        res.employee.address = req.body.address
    }
    try {
        const updatedEmployee = await res.employee.save()
        res.json(updatedEmployee)
    } catch(err) {
        res.status(400).send({ message: err.message})
    }
})

// Deleting one
router.delete('/:id', getEmployee, async (req, res) => {
   try {
       await res.employee.remove()
       res.json({ message: 'Employee has been removed'})
   } catch(err) {
    res.status(500).send({ message: err.message})
   }
})

// Deleting all
router.delete('/', (req, res) => {
    
})

async function getEmployee(req, res, next) {
    let employee
    try {
        employee = await Employee.findById(req.params.id)
        if(employee == null) {
            return res.status(404).send('Cannot find employee')
        }
    } catch(err) {
        return res.status(500).send({ message: err.message})
    }
    res.employee = employee
    next()
}


module.exports = router