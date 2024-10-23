const { findProduct, newProduct, findProductBasedOnId, deleteProduct } = require("../repository/productRepository")
const Cloudinary = require("../Config/cloudinaryConfig")
const fs = require("fs/promises")
const internalServerError = require("../ErrorClass/internalServerError")
const badRequestError = require("../ErrorClass/badRequestError")
const notFoundError = require("../ErrorClass/notFoundError")

async function creatingProduct(productDetails){
    const productImage = productDetails.image
    if(productImage){
        const cloudinaryUpload = await Cloudinary.uploader.upload(productImage)
        var resultImage = await cloudinaryUpload.secure_url
        await fs.unlink(productImage)
    }
    const fetchDetails = {
        name : productDetails.name,
    }
    const response = await findProduct(fetchDetails)
    if(response){
        throw new badRequestError("product with given name already exists ")
    }

    const Product = await newProduct({
        ...productDetails,
        image:resultImage
    })
    if(!Product){
        throw new internalServerError()
    }

    return Product 
}

async function gettingProductBasedOnId(productID){
    const result = await findProductBasedOnId(productID)
    if(!result){
        throw new notFoundError("product",404)
    }
    return result
}

async function deleteProductById(productID){
    const result = await deleteProduct(productID)
    if(!result){
        throw new notFoundError("product",404)
    }
    return result 
}

module.exports = {
    creatingProduct,gettingProductBasedOnId,deleteProductById
}