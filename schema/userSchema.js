const mongoose = require("mongoose")
const userScehma = new mongoose.Schema({
    firstName:{
        //all these properties are validators of mongoose 
        type:String,
        required:[true,"First name is necessary"],
        minlength:[5,"First name should be atleast of 5 characters"],
        trim:true
    },
    lastName:{
        type:String,
        required:[true,"Last name is necessary"],
        trim:true
    },
    phNumber:{
        type:String,
        unique:true,
        maxlenght:10,
        minlength:10,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:[true,"Email should be prvoided"],
        unique:[true,"Email already in use"],
        //match is a regex that shows how the detail shud be written 
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    password:{
        type:String,
        required:[true,"Password should be provided"],
        minlength:[10,"Password should be of minimium 10 characters long"]
    },
},{timestamps:true})

const user = mongoose.model("UserSchema",userScehma)
module.exports = user