//const UserRepository = require("../repository/userRepository")
const { createUserr } = require("../service/userService")
//const userService = require("../service/userService")

async function createNewUser(req,res){
    //const UserService = new userService(new UserRepository())
    try{
        //const response = await UserService.createUser(req.body)
        const response = await createUserr(req.body)
        return res.json({
            message:"User created",
            success:true,
            data:response,
            error:{}
        })
    }catch(error){
        return res.status(error.statuscode).json({
            message:error.reason,
            success:false, 
            data:{}
        })
    }
}

module.exports = createNewUser