const AppError = require("./AppError");

class internalServerError extends AppError{
    constructor(){
        super("Something went wrong",500)
    }
}

module.exports = internalServerError