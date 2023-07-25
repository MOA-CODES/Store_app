const Product = require('../models/products_M')

const getALLproducts = async(req,res)=>{

    const {name, featured, company, sort, fields, numericFilter} = req.query //this helps to filter what the user sends us as query through params
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
            if(numericFilter){
                const operatorMap = {
                    '>':'$gt',
                    '>=':'$gte',
                    '=':'$eq',
                    '<':'$lt',
                    '<=':'$lte',}
    
                const regEx = /\b(<|>|>=|=|<|<=)\b/g    //dont ask me i dont know wtf this is, copied it
                let filters = numericFilter.replace(regEx,(match)=> `-${operatorMap[match]}-`) //i understand it but xD
                //Basically its like an array searching with its index for one of its elements, were using it to swap
                //to make dynamic search with syntax understood by mongoose
    
                const options = ['price','rating'];
                filters = filters.split(',').forEach(element => {
                    const [field,operator,value] = element.split('-')  //destructuring 
                    if(options.includes(field)){
                        queryObject[field] = {[operator]:Number(value)}
                    }
                });
            }
        
        console.log(queryObject)
        let result = Product.find(queryObject)
        if(sort){
            const sortlist = sort.split(',').join(' ');
            result = result.sort(sortlist);
        }else{
            result = result.sort('createdAt')
        }

        if(fields){ //the fields from the document iwant to see
            const fieldslist = fields.split(',').join(' ');
            result = result.select(fieldslist);
        }
        

        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        const skip = (page-1)*limit|| 1
        //for example if its page is 2 and limit is 10, skip becomes 10, so it shows the next 10 after the first 10

        result = result.limit(limit).skip(skip)
        const products = await result
        res.status(200).json({nbhits: products.length,products})

    /*my own solution to sorting
        let products;
        if(sort){
            console.log(sort)
            products = await Product.find(queryObject).sort(`${sort}`)
        }else{
             products = await Product.find(queryObject)
        }
        res.status(200).json({nbhits: products.length,products})*/  
        
    /* console.log(queryObject)
    // const products = await Product.find(queryObject)
    // res.status(200).json({nbhits: products.length,products})*/
}

//Damborugba i dey confuse small small 

const getALLproductsStatic = async(req,res)=>{
    /*const search = 'ab'
    const products = await Product.find({name:'wooden table'})
    const products = await Product.find({})
    const products = await Product.find({name:{$regex:search, $options: 'i'},})
    const products = await Product.find({}).sort('-name')*/
    const products = await Product.find({price:{$gt:30}})
    .sort('price')
    .select('name price')
    .limit(5)
    .skip(3)

    res.status(200).json({nbhits: products.length, products})}



module.exports = {getALLproducts, getALLproductsStatic}