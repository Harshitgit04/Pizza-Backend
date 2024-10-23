const badRequestError = require("../ErrorClass/badRequestError")
const internalServerError = require("../ErrorClass/internalServerError")
const notFoundError = require("../ErrorClass/notFoundError")
const { getCart, clearCart } = require("../repository/cartRepository")
const { createOrder, getOrders, getOrderById, updateOrder } = require("../repository/orderRepository")
const { findUser } = require("../repository/userRepository")

async function createNewOrder(userId,paymentMethod){
    const cart = await getCart(userId)
    const user = await findUser({_id:cart.user})

    if(!cart){
        throw new notFoundError("Cart")
    }
    if(cart.items.length===0){
        throw new badRequestError(["Cart is empty,Unable to place order"])
    }
    const orderObject = {}
    orderObject.user=cart.user
    orderObject.items=cart.items.map(cartProduct =>{
        return {product:cartProduct.product._id,
                quantity:cartProduct.quantity
            }
    })
    orderObject.totalPrice=0
    cart.items.forEach(cartItem=>{
        orderObject.totalPrice+=cartItem.product.price*cartItem.quantity
    })
    orderObject.address=user.address
    orderObject.status="Ordered"
    orderObject.paymentMethod=paymentMethod

    const order = await createOrder(orderObject)
    if(!order){
        throw new internalServerError()
    }
    await clearCart(userId)
    return order
}

async function GetOrders(userId){
    const order = await getOrders(userId)
    if(!order){throw new badRequestError(["User have not ordered anything"])}
    return order
}

async function getOrdersById(orderId){
    const order = await getOrderById(orderId)
    if(!order){
        throw new notFoundError("Order")
    }
    return order 
}

async function updateOrderById(orderId,status){
    const order = await updateOrder(orderId,status)
    if(!order){
        throw new notFoundError("Order")
    }
    return order 
}
module.exports = {createNewOrder,GetOrders,getOrdersById,updateOrderById}