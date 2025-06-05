import mongoose, { Error } from "mongoose";

export const dbConnection = ()=>{
const connectionString = process.env.DATABASE;
mongoose.connect(connectionString).then(()=>{
    console.log('MongoDB atlas connected Successfully');
}).catch((error)=>{
    console.log('MongoDB connection Error',error);
})
}