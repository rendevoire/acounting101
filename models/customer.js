const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    address_1: {
        type: String,
        required: false
    },
    address_2: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: String,
        required: true,
        default: Date.now
    },
    log: {
        type: Array
    }
},{
    timestamps: {
        createdAt: 'created_at'
    }
})

module.exports = mongoose.model('Customer', customerSchema)