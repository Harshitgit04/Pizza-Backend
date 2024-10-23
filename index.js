const express = require("express")
const app = express()
const ServerConfig = require("./Config/serverConfig")
const connectDB = require("./Config/dbConfig")
const userRoutes = require("./Routers/userRouters")
const { authRouter } = require("./Routers/authRouter")
const cookieParser = require("cookie-parser")
const { productRoutes } = require("./Routers/productRouter")
const { cartRouter } = require("./Routers/cartRouter")
const { orderRoutes } = require("./Routers/orderRouters")

//these are desrialisers or decoders for the request //middlewares
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use("/users",userRoutes)
app.use("/auth",authRouter)
app.use("/product",productRoutes)
app.use("/cart",cartRouter)
app.use("/orders",orderRoutes)

app.get("/ping",function post(req,res){
    console.log(req.body)
    return res.status(201).json({success:true,message:"Pong"}) 
})

app.listen(ServerConfig.PORTNO,async ()=>{
    await connectDB()
    console.log(`Server has been started at port no ${ServerConfig.PORTNO}...`)
})    