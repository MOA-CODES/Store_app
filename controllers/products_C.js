const Product = require('../models/products_M')

const getALLproducts = async(req,res)=>{

    const {name, featured, company, sort} = req.query //this helps to filter what the user sends us as query through params
    //so if the user sends something random thats not in there it wouldn't be included
    
        const queryObject = {} //if this is empty we will just get everything data we have
            if (featured){
                queryObject.featured = featured === 'true' ? true : false
            }
            if (company){
                queryObject.company = company 
            }
            if(name){
                queryObject.name = {$regex: name, $options: 'i'} //regex helps for if the pattern is found in the document not necessarily 
                //completely matching
                //options : 'i' means that it isnt case sensitive
            }
    
        // console.log(queryObject)
        let result = Product.find(queryObject)
        if(sort){
            const sortlist = sort.split(',').join(' ');
            result = result.sort(sortlist);
        }else{
            result = result.sort('createdAt')
        }
        const products = await result
       /*my own solution to sorting
        let products;
        if(sort){
            console.log(sort)
            products = await Product.find(queryObject).sort(`${sort}`)
        }else{
             products = await Product.find(queryObject)
        }*/
        res.status(200).json({nbhits: products.length,products})

    // console.log(queryObject)
    // const products = await Product.find(queryObject)
    // res.status(200).json({nbhits: products.length,products})
}

//Damborugba im coming in heavy

const getALLproductsStatic = async(req,res)=>{
    const search = 'ab'
    // const products = await Product.find({name:'wooden table'})
    // const products = await Product.find({})
    // const products = await Product.find({name:{$regex:search, $options: 'i'},})
    const products = await Product.find({}).sort('-name')


    res.status(200).json({nbhits: products.length, products})
}



module.exports = {getALLproducts, getALLproductsStatic}