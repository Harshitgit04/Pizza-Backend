const dotenv = require("dotenv")
dotenv.config()

module.exports={
    PORTNO : process.env.PORTNO,
    DB_URL : process.env.DB_URL
}