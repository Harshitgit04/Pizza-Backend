const express = require("express")
const { createProduct, getProductBasedOnId, deleteProductBasedOnId } = require("../controllers/productController")
const uploader = require("../Middlewares/multerMiddlewares")
const { isLoggedIn, isAdmin } = require("../validation/authValidators")
const productRoutes = express.Router()

productRoutes.post("/create",isLoggedIn,isAdmin,uploader.single("image"),createProduct)
productRoutes.get("/:id",getProductBasedOnId)
productRoutes.delete("/:id",deleteProductBasedOnId)

module.exports = {
    productRoutes
} 