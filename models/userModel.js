import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
    },
    role:{
        type:Number,
        default:0,
        required:true
    },
    
})

const users = mongoose.model('users',userSchema)

export default users