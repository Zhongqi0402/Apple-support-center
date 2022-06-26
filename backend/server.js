const express = require("express")
const dotenv = require("dotenv").config()
const {errorHandler} = require("./middleware/errorMiddleware")
const PORT = process.env.PORT || 8000
const colors = require("colors")
const connectDB = require('./config/db')
const path = require('path')
// connect to database
connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))
app.use('/api/admin', require('./routes/adminRoutes'))

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
    // Set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')))
  
    // FIX: below code fixes app crashing on refresh in deployment
    app.get('*', (_, res) => {
      res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.status(200).json({ message: 'Welcome to the Support Desk API' })
    })
}

app.use(errorHandler)
const server = app.listen(PORT, () => {console.log(`started on ${PORT}`)})
const io = require('./socket').init( server );
io.on('connection', socket => {
    console.log('Client connected');
});
