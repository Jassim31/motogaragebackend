

import cart from "../models/cartModel.js"

export const addToCart = async(req,res)=>{
    const {productId, quantity} = req.body
    try {
        const existingCart =await cart.findOne({userId: req.user._id})
        if(!existingCart){
            const newCart= new cart({
                userId: req.user._id,
                products:[{
                    productId,
                    quantity
                }]
            })
            await newCart.save()
            return res.status(201).send(newCart);
        }
        else{
            const existingItem = existingCart.products.find((p)=>p.productId.equals(productId))
            if(existingItem){
                existingItem.quantity+=quantity
            }else{
                existingCart.products.push({productId,quantity})
            }
            await existingCart.save()
            return res.status(200).send(existingCart);
        }
    }
    catch(error) {
         res.status(500).send( "internal server error" )
        console.log(error);
        
    }
}

// get cart

export const getCart = async (req,res)=>{
 const userId = req.user._id
 try {
    const cartItems = await cart.findOne({userId}).populate({
        path: "products.productId", select: "name description price image"
    })
    res.status(200).send(cartItems)
 } catch (error) {
    res.status(500).send("internal server error")
    console.log(error);
    
 }
}