const AppError = require("./AppError");

class notFoundError extends AppError{
    constructor(resource){
        super(`Not able to find the ${resource}`,404)
    }
}

module.exports = notFoundError