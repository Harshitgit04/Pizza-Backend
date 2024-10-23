const internalServerError = require("../ErrorClass/internalServerError")
const orderSchema = require("../schema/orderSchema")

async function createOrder(orderDetails){
    try{
        const order = await orderSchema.create(orderDetails)
        return order
    }catch(error){
        console.log(error)
        throw new internalServerError()
    }
}

async function getOrders(userId){
    try{
        const order = await orderSchema.find({user:userId}).populate("items.product")
        return order 
    }catch(error){
        console.log(error)
        throw new internalServerError() 
    } 
}

async function getOrderById(orderId){
    try{
        const order = await orderSchema.findById(orderId).populate("items.product")
        return order
    }catch(error){
        console.log(error)
        throw new internalServerError() 
    }
}

async function updateOrder(orderId,status){
    try{
        const order = await orderSchema.findByIdAndUpdate(orderId,{status:status},{new:true})
        return order
    }catch(error){
        console.log(error)
        throw new internalServerError() 
    }
}
module.exports = {createOrder,getOrders,getOrderById,updateOrder}