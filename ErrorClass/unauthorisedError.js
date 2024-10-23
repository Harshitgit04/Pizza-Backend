const AppError = require("../ErrorClass/AppError")

class unauthorisedError extends AppError{
 constructor(){
    super("Unauthorised user",401)
 }
}

module.exports = {
   unauthorisedError
} 