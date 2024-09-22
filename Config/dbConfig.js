const mongoose = require("mongoose")
const ServerConfig = require ("../Config/serverConfig")

async function connectDB(){
    try{
        await mongoose.connect(ServerConfig.DB_URL)
        console.log("Connected to database successfully")
    }catch(error){
        console.log("Not able to connect to the mongo db server")
        console.log(error)
    }
}

module.exports= connectDB