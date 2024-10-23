const badRequestError = require("../ErrorClass/badRequestError")
const internalServerError = require("../ErrorClass/internalServerError")
const notFoundError = require("../ErrorClass/notFoundError")
const cartSchema = require("../schema/cartSchema")
const { findProductBasedOnId } = require("./productRepository")

async function createCart(userId){
    try{
        const cart = await cartSchema.create({user : userId}) 
        return cart 
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

async function getCart(userId){
    try{
        const cart = await cartSchema.findOne({user:userId}).populate('items.product')
        return cart 
    }catch(error){
        console.log(error)
        throw new internalServerError()
    }
}

async function clearCart(userId){
    try{
        const cart = await cartSchema.findOne({user:userId})
        if(!cart){throw new notFoundError("cart")}
        cart.items = []
        await cart.save()
        return cart
    }catch(error){
        console.log(error)
        throw new internalServerError()
    } 
}

module.exports = { createCart , getCart, clearCart}