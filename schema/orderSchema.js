const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema ({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserSchema",
        required:true
    },
    items:[
        {
            product :{
                type:mongoose.Schema.Types.ObjectId,
                ref:'ProductSchema',
                required:true
            },
            quantity:{
                type:Number,
                required:true,
                default:1
            }
        },
    ],
    totalPrice:{
        type:Number,
        required:true
    },
    address:{
        type:String
    },
    status:{
        type:String,
        required:true,
        enum:["Ordered","Canceled","Processing","Out For Delivery","Delivered"]
    },
    paymentMethod:{
        type:String,
        enum:["Cash","UPI"],
        default:"Cash"
    }
},{timestamps:true,versionKey:false})

module.exports = mongoose.model("OrderSchema",orderSchema) 