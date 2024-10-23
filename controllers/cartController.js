const AppError = require("../ErrorClass/AppError")
const { getCartByUserId, modifyCart, clearCartById } = require("../service/cartService")

async function gettingCartByUserId(req,res){
    try{
        const cart = await getCartByUserId(req.user.id)
        return res.status(200).json({
            success:true,
            message:"Successfully fetched the cart",
            data:cart,
            error:{}
        })
    }catch(error){
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success:false,
                message:error.message,
                data:{},
                error:error
            })
        }
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
            error:error,
            data:{}
        })
    }
}

async function modifyCartById(req,res){
    try{
        const cart = await modifyCart(req.user.id,req.params.id,req.params.operation=="add")
        return res.status(200).json({
            success:true,
            message:"Successfully added product to the cart",
            data:cart,
            error:{}
        })
    }catch(error){
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success:false,
                message:error.message,
                data:{}, 
                error:error
            })
        }
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
            error:error,
            data:{}
        })
    }
}

async function clearProductsFromCart(req,res){
    try{
        const cart = await clearCartById(req.user.id)
        return res.status(200).json({
            success:true,
            message:"Successfully cleared the cart",
            data:cart,
            error:{}
        })
    }catch(error){
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success:false,
                message:error.message,
                data:{},
                error:error
            })
        }
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
            error:error,
            data:{}
        })
    }
}

module.exports = { gettingCartByUserId,modifyCartById, clearProductsFromCart}

