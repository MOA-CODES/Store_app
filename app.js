//Requirements
require('dotenv').config() //these types should come first
require('express-async-errors')

const express = require('express');
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')
const connectDB = require('./db/connect')
const productsR = require('./routes/products_R')



//async errors

const app = express();
app.use(express.json())
app.get('/', (req,res)=>{
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products</a>')
})
//API routes
//route
app.use('/api/v1/products', productsR)

//products route
app.use(notFound)
app.use(errorHandler)

const Port = process.env.PORT || 3000

connectDB()
app.listen(Port, (req, res)=>{
    console.log(`Server is listening on port ${Port}`)
})


