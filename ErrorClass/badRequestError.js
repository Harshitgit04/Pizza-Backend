const AppError = require("./AppError");

class badRequestError extends AppError{
    constructor(invalidParams){
        let message = " "
        invalidParams.forEach(params => message+=`${params}`)
        super(`${message}`,400)
    }
}

module.exports = badRequestError