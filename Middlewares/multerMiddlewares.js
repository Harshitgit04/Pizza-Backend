//multer is owned by express which helps us in storing the files in server
const multer = require("multer")
const path = require("path")

//this is the process as it is to store the file in server
const StoringFile = multer.diskStorage({  //this is a middleware
    destination: function (req,file,cb){ 
        cb(null,"uploads") /*destination is used to store the file and here we give the name of folder 
                            in which the file is to be stored ..cb is a callback whose value will be null
                            always because file is the image that doesnt have any value   */
    },
    filename: function(req,file,cb){  //this is used to rename the file stored 
        cb(null,`${Date.now()}${path.extname(file.originalname)}`)
    }
})
const uploader = multer({storage:StoringFile}) //this is a middleware

module.exports = uploader