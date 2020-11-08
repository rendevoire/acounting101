const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
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

module.exports = mongoose.model('Item', itemSchema)