require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose.connect(process.env.DATABASE_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', (error) => console.error(error.message))
db.once('open', () => console.log('connected to database'))

app.use(express.json())

const employeesRouter = require('./routes/employees')
app.use('/employees', employeesRouter)


app.listen(3000, () => console.log(`server started to port 3000`))