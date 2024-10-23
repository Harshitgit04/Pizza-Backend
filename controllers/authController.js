const { loginUser } = require("../service/authService")

async function logout(req,res){
    res.cookie("authToken","",{  
        httpOnly:true, 
        secure:false       
    })
    return res.status(201).json({
        success:true,
        message:"Log Out Successfull",
        error:{},
        data:{}
    })
}
async function login(req,res){
    try{
        const payload = req.body
        const response = await loginUser(payload)
        res.cookie("authToken",response,{   //authtoken is name of cookie in which the token is stored 
            httpOnly:true,      //it makes the cookie unaccessible by javascript on the browser by anyone
            secure:false        //if its true then it means that it cant be accessed through https request
        })
        return res.status(200).json({
            success:true,
            message:"Login Successfull",
            data:{},
            error:{}
        })
    }catch(error){
        return res.status(error.statusCode).json({
            success:false,
            message:error.message,
            status:error.statusCode,
            error:error,
            data:{}
        })
    }
}

module.exports = {login,logout}