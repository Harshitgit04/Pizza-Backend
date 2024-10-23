const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:[true,"Product name is mandatory"],
        unique:[true,"Product name already taken"],
        trim:true,
    },
    price:{
        type:Number,
        required:[true,"Product price is necessary"],
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    category:{
        type:String,
        enum:["veg","non-veg","sides","drinks"],
        default:"veg",
        required:[true,"Product category is necessary"],
        trim:true
    },
    image:{
        type:String
    },
    inStock:{
        type:Boolean,
        default:true,
        required:[true,"Tell if the product is in stock or not"]
    },
    quantity:{
        type:Number,
        required:true,
        default:5
    }
},{timestamps:true,versionKey:false})

module.exports = mongoose.model("ProductSchema",productSchema)