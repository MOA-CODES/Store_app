const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']},
    price:{
        type:Number,
        required:[true,'price is required']},
    featured:{
        type:Boolean,
        default:false},
    rating:{
        type:Number,
        default: 4.5},
    createdAt:{
        type: Date,
        default: Date.now()},
    company:{
        type:String,
        enum:{
            values:['marcos','ikea','liddy','caressa','marcos'],
            message: '{VALUE} is not supported'
        }//message is the error message to be displayed if something else is entered
        //enum:['marcos','ikea','liddy','caressa','marcos']
    },
})

module.exports = mongoose.model('Product',productSchema)