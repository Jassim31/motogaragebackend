import mongoose from "mongoose";

// cart model creation

const cartSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
        required : true
    },
    products : [{
        productId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "products",
            required : true
        },
        quantity : {
        type : Number,
        required : true
    }
    }],
    
})

const cart = mongoose.model("cart",cartSchema)
export default cart