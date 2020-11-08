const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
        default: Date.now
    }
},{
    timestamps: {
        createdAt: 'created_at'
    }
})

module.exports = mongoose.model('Employee', employeeSchema)