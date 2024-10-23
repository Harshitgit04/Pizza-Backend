const AppError = require("../ErrorClass/AppError")
const badRequestError = require("../ErrorClass/badRequestError")
const internalServerError = require("../ErrorClass/internalServerError")
const notFoundError = require("../ErrorClass/notFoundError")
const { getCart, clearCart } = require("../repository/cartRepository")
const { findProductBasedOnId } = require("../repository/productRepository")

async function getCartByUserId(userId){
    const gettingCart = await getCart(userId)
    if(!gettingCart){throw new internalServerError()} 
    else {return gettingCart}
}

async function modifyCart(userId,productId,shouldAdd=true){
    const quantityValue = (shouldAdd==true)?1:-1
    const cart = await getCart(userId)
    const product = await findProductBasedOnId(productId)
    if(!product){
        throw new notFoundError("Product")
    }
    if(!product.inStock && product.quantity<=0){
        throw new badRequestError(["Product not available in stock"])
    }
    let productFound = false
    cart.items.forEach(item=>{
        if(item.product._id==productId){
            if(shouldAdd){
                if(product.quantity>=item.quantity+1){
                    item.quantity+=quantityValue
                }else{
                 throw new AppError("Quantity requested is not available",404)   
                }
            }else{
                if(item.quantity>0){
                    item.quantity+=quantityValue
                    if(item.quantity==0){
                        cart.items=cart.items.filter(item=>{item.product._id!==productId})
                        productFound=true
                        return
                    }
                }else{
                    throw new AppError("Quantity requested is not available",404)   
                   }
            }
            productFound=true
        }
    })
    if(!productFound){
        if(shouldAdd){
            cart.items.push({
                product:productId,
                quantity:1
            })
        }else{
            throw new notFoundError("Product in the cart")
        }
    }
    await cart.save()
    return cart
}

async function clearCartById(userId){
    const response = await clearCart(userId)
    return response
}

module.exports = { getCartByUserId , modifyCart,clearCartById}