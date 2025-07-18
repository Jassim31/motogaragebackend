import multer from "multer"

const storage =multer.diskStorage({
    destination:(req,file,callback)=>{callback(null,'./uploads')
    },
    filename:(req,file,callback)=>{
        callback(null,`image-${Date.now()}-${file.originalname}`)
    }
})

export const multerConfig = multer({
    storage
})