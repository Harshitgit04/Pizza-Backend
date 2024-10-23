const badRequestError = require("../ErrorClass/badRequestError")
const internalServerError = require("../ErrorClass/internalServerError")
const ProductSchema = require("../schema/productSchema")

async function findProduct(productDetails){
    try{
        const findingProduct = await ProductSchema.findOne({...productDetails})
        return findingProduct
    }catch(error){
        console.log(error)
        throw new internalServerError()
    }
}

async function newProduct(productDetails){
    try{
        const creatingProduct = await ProductSchema.create({...productDetails})
        return creatingProduct
    }catch(error){
        if(error.name==="ValidationError"){
            const errorMessageList = Object.keys(error.errors).map((property)=>{
                return error.errors[property].message
            })
            throw new badRequestError(errorMessageList)
        }
        console.log(error)
        throw new internalServerError()
    }
}

async function findProductBasedOnId(productID){
    try{
        const response = await ProductSchema.findById(productID)
        return response
    }catch(error){
        console.log(error)  
        throw new internalServerError()
    }
}

async function deleteProduct(productID){
    try{
        const response = await ProductSchema.findByIdAndDelete(productID)
        return response
    }catch(error){
        console.log(error)
        throw new internalServerError()
    }
}

module.exports = {
    findProduct , newProduct , findProductBasedOnId , deleteProduct
}    