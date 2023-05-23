require('dotenv').config()
const express = require ('express');
const app = express();
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const {logger} = require('./middleware/logEvents')
const credentials = require('./middleware/credentials')
const errorHandler = require('./middleware/errorHandler')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
const PORT = process.env.PORT || 4200

//connect to MongoDB
connectDB()

//custom middleware to log all requests and their origin 
app.use(logger)

//handle options credentials check - before CORS, and fetch cookies credentials requirement
app.use(credentials)

//apply middleware for CORS options 
app.use(cors(corsOptions))

//middleware to handle url encoed data 
app.use(express.urlencoded({extended: false}))

//middleware for json 
app.use(express.json())

//Route handlers without JWT authorization 
app.use('/api/test', require('./routes/api/test'))
app.use('/api/space', require('./routes/api/spaces'))

//custom error handler
app.use(errorHandler)

//only listen to request when mongoDB is connected 
mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB")
    app.listen(PORT, () => console.log(`Server running on port ${PORT}...`))
})


