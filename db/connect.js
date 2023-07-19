const mongoose = require('mongoose')

const connectDB = async() => {
  try{
    await mongoose.connect(process.env.MONGO_URI).then(()=>console.log('Connected to MongoDB..'))
    // await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>console.log('connected to MongoDB..'))
  }catch(error){
    console.log(error).then(()=>process.exit(1))
  }
}

module.exports = connectDB
