const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userScehma = new mongoose.Schema({
    firstName:{
        //all these properties are validators of mongoose 
        type:String,
        required:[true,"First name is necessary"],
        trim:true
    },
    lastName:{
        type:String,
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
    address:{
        type:String
    },
    role:{
        type:String, 
        enum:["USER","ADMIN"],
        default:"USER",
        required:true
    }
},{timestamps:true})

//bcrypt is used to protect the password or any other details 
/* it uses hashing algorithms that map a large amount of data into a smaller one that reduces the chances of 
  getting real password or any other detail back from the bcyrpted one */
userScehma.pre('save',async function next(){
    const hashedPassword = await bcrypt.hash(this.password,10)
    this.password = hashedPassword
}) 

const user = mongoose.model("UserSchema",userScehma)
module.exports = user 