import asyncHandler from '../middlewear/asyncHandler.js'
import Product from '../models/productModels.js'



//get Product
//


const getProduct = asyncHandler(async(req, res) => {
   const products = await Product.find({})
   res.json(products)
})

const getProductById = asyncHandler(async(req, res) => {
    const products = await Product.findById(req.params.id)

    if(products){
        return res.json(products)
    }else{
        res.status(404)
    }
})


export {getProduct, getProductById}
