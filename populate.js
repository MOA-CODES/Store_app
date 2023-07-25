require('dotenv').config()

const connectDB = require('./db/connect')
const Product = require('./models/products_M')

const jsonProducts = require('./products.json')

connectDB()

const deleteAndpopulate = async () => {
    try{
        await Product.deleteMany().then(()=>console.log('All initial Product data has been deleted..'));
        await Product.create(jsonProducts).then(()=>console.log('All data from File has been inputted into Product schema'));
        process.exit(0);
    }catch(error){
        console.log(error).then(()=>process.exit(1))
    }
}

deleteAndpopulate();