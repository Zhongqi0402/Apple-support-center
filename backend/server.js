const express = require("express")
const dotenv = require("dotenv").config()
const {errorHandler} = require("./middleware/errorMiddleware")
const PORT = process.env.PORT || 8000
const colors = require("colors")
const connectDB = require('./config/db')

// connect to database
connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.status(200).send("Hello world")
})

// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))
app.use(errorHandler)
app.listen(PORT, () => {console.log(`started on ${PORT}`)})
