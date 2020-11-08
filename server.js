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

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(express.json())

app.get('/', (req, res) => {
    res.send('home')
})

const employeesRouter = require('./routes/employees')
app.use('/api/v1/employees',  employeesRouter)

const customersRouter = require('./routes/customers.js')
app.use('/api/v1/customers', customersRouter)

const itemsRouter = require('./routes/items')
app.use('/api/v1/items', itemsRouter)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server started to port ${port}`))