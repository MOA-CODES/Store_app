//Requirements
const express = require('express');
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')
const connectDB = require('./db/connect')

require('dotenv').config()

//async errors

const app = express();
app.get('/', (req,res)=>{
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products</a>')
})
app.use(express.json())

//products route/API routes

app.use(errorHandler)
app.use(notFound)

const Port = process.env.PORT || 3000

connectDB()

app.listen(Port, (req, res)=>{
    console.log(`Server is listening on port ${Port}`)
})


