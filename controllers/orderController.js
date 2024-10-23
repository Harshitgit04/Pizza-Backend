const AppError = require("../ErrorClass/AppError")
const { createNewOrder, GetOrders, getOrdersById, updateOrderById } = require("../service/orderService")

async function newOrder(req,res){
    try{
        const order = await createNewOrder(req.user.id,req.body.paymentMethod)
        return res.status(201).json({
            success:true,
            message:"Order successfull",
            data:order,
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
            data:{},
            error:error
        })
    }
}

async function gettingOrders(req,res) {
    try{
        const order = await GetOrders(req.user.id)
        return res.status(201).json({
            success:true,
            message:"Orders fetched successfully",
            data:order
        })
    }catch(error){
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success:false,
                message:error.message,
                error:error,
                data:{}
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

async function gettingOrderById(req,res){
    try{
        const order = await getOrdersById(req.params.id)
        return res.status(201).json({
            success:true,
            message:"Order fetched successfully",
            data:order
        })
    }catch(error){
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success:false,
                message:error.message,
                error:error,
                data:{}
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

async function cancellingOrderById(req,res){
    try{
        const order = await updateOrderById(req.params.id,req.body.status)
        return res.status(201).json({
            success:true,
            message:"Order cancelled successfully",
            data:order
        })
    }catch(error){
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success:false,
                message:error.message,
                error:error,
                data:{}
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

async function updatingOrderById(req,res){
    try{
        const order = await updateOrderById(req.params.id,req.body.status)
        return res.status(201).json({
            success:true,
            message:"Order updated successfully",
            data:order
        })
    }catch(error){
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success:false,
                message:error.message,
                error:error,
                data:{}
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

module.exports = {
    newOrder,gettingOrders,gettingOrderById,cancellingOrderById, updatingOrderById
}