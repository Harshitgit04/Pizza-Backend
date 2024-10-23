const express =  require("express")
const { isLoggedIn } = require("../validation/authValidators")
const { gettingCartByUserId, modifyCartById, clearProductsFromCart} = require("../controllers/cartController")

const cartRouter = express.Router()
cartRouter.get("/:id",isLoggedIn,gettingCartByUserId)
cartRouter.post("/:operation/:id",isLoggedIn,modifyCartById)
cartRouter.delete("/products",isLoggedIn,clearProductsFromCart)

module.exports = { cartRouter }