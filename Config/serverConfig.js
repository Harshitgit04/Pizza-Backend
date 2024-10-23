const dotenv = require("dotenv")
dotenv.config()

module.exports={
    PORTNO : process.env.PORTNO,
    DB_URL : process.env.DB_URL,
    CLOUDINARY_NAME : process.env.CLOUDINARY_NAME,
    CLOUDINARY_KEY : process.env.CLOUDINARY_KEY,
    CLOUDINARY_SECRET : process.env.CLOUDINARY_SECRET
}