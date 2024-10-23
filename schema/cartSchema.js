const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        requireed : true,
        ref : "UserSchema",
        unique : true
    },
    items : [
        {
            product : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "ProductSchema",
                required : true
            },
            quantity :{
                type : Number,
                requried : true,
                default : 1
            }
        }
    ],
},{timestamps:true,versionKey:false}) 

module.exports = mongoose.model("CartSchema",cartSchema) 