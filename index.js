const express = require("express")
const app = express()
const ServerConfig = require("../Express App/Config/serverConfig")
const connectDB = require("./Config/dbConfig")


//these are desrialisers or decoders for the request 
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded())

app.post('/ping',(req,res)=>{ //this code is generally present in controllers
    console.log(req.body)
    return res.json({message:"pong"})
})


app.listen(ServerConfig.PORTNO,async ()=>{
    await connectDB()
    console.log(`Server has been started at port no ${ServerConfig.PORTNO}...`)
})