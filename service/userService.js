const { createCart } = require("../repository/cartRepository")
const { findUser, createUser } = require("../repository/userRepository")

/*class userService{
    constructor(userRepository){
        this.userRepository = userRepository
    }
*/
    async function createUserr(userDetails){ 
        const user = await findUser({
            phNumber:userDetails.phNumber,
            email:userDetails.email
        })
        if(user){
            throw{reason:"User with this email and number already exists",statuscode:400} 
        }

        const newUser = await createUser({
            firstName:userDetails.firstName,
            lastName:userDetails.lastName,
            email:userDetails.email, 
            phNumber:userDetails.phNumber,
            password:userDetails.password
        })
        if(!newUser){
            throw{reason:"Cant create user.Check the details properly or try again later",statuscode:500}
        }
        await createCart(newUser._id) 
        return newUser
    }
//}

module.exports = {createUserr}