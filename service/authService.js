const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { findUser } = require("../repository/userRepository")

async function loginUser(authDetails){
        const email = authDetails.email
        const plainPassword = authDetails.password

        const response = await findUser({email})
        if(!response) throw{message:"No user with the given email address",statusCode:404} 

        const isPasswordValidated = await bcrypt.compare(plainPassword,response.password)
        if(!isPasswordValidated) throw{message:"Invalid password entered",statusCode:401}

        //const userRole = response.role? response.role:"USER"
        const token = jwt.sign({email:response.email, id:response._id, role:response.role},"harshit",{expiresIn:"1d"})
        return token
}

module.exports = {loginUser}