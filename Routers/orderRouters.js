const express = require("express")
const { isLoggedIn, isAdmin } = require("../validation/authValidators")
const { newOrder, gettingOrders, gettingOrderById, cancellingOrderById, updatingOrderById } = require("../controllers/orderController")
const orderRoutes = express.Router()

orderRoutes.post("/create",isLoggedIn,newOrder)
orderRoutes.get("/get",isLoggedIn,gettingOrders)
orderRoutes.get("/:id",isLoggedIn,gettingOrderById)
orderRoutes.put("/cancel/:id",isLoggedIn,cancellingOrderById)
orderRoutes.put("/update/:id",isLoggedIn,isAdmin,updatingOrderById)


module.exports = {orderRoutes}