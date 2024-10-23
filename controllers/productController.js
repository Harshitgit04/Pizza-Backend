const AppError = require("../ErrorClass/AppError")
const { creatingProduct, gettingProductBasedOnId, deleteProductById } = require("../service/productService")

async function createProduct(req,res){
    try{
        const product = await creatingProduct({
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            category:req.body.category,
            inStock:req.body.inStock,
            image:req.file?.path  //get the path if the image is given by the user 
        }) 
        return res.status(201).json({
            success:true,
            message:"Product created successfully",
            data:product,
            error:{}
        })
    }catch(error){
        if(error instanceof AppError){
            return res.status(error.statuscode).json({
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

async function getProductBasedOnId(req,res){
    try{
        const product = await gettingProductBasedOnId(req.params.id)
        return res.status(200).json({
            message:"Product fetched successfully",
            data:product,
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

async function deleteProductBasedOnId(req,res){
    try{
        const product = await deleteProductById(req.params.id)
        return res.status(200).json({
            message:"Successfully deleted the product with given id",
            data : product,
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

module.exports = {
    createProduct,getProductBasedOnId,deleteProductBasedOnId
}