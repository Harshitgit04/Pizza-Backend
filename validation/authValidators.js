const jwt = require("jsonwebtoken")
const unauthorisedError = require("../ErrorClass/unauthorisedError")
/* Validators are the middlewares that are used before accessing the controllers and here the token or the
    cookie is verified and if it is verified then the user will be allowed to access the api which will be 
    done by sending the control to controller further ...
    When we use validator with any api then that api will be considered as protected api

    we will just add this isloggedin layer in the router just before it access the controller so that
        it will first hit the validator layer and after that goes to controller  
*/

async function isLoggedIn(req,res,next){
    const token = req.cookies["authToken"] 
    if(!token){
        return res.status(401).json({
            success:false,
            data:{},
            message:"No token provided",
            error:"Not authenticated"
    })
    }
    try{
        const decoded = jwt.verify(token,"harshit")
        if(!decoded){
            throw new unauthorisedError
        }
        req.user={
            email:decoded.email,
            id:decoded.id,
            role:decoded.role
        }
        next()
    }catch(error){
        return res.status(401).json({
            success:false,
            data:{},
            message:"Invalid token provided",
            error:error
        })
    }
    
}

function isAdmin(req,res,next){
    const loggedUser = req.user 
    if(loggedUser.role==="ADMIN"){
        next()
    }
    else{ 
        return res.status(401).json({
            success:false,
            data:{},
            message:"User not authorised for this action",
            error:{
                statusCode:401,
                reason:"Unauthorised user"
            }
        })
    }
}
 
module.exports = {
    isLoggedIn,isAdmin
}