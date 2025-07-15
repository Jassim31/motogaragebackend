import Razorpay from "razorpay"
import cart from "../models/cartModel.js"
import Order from "../models/orderModel.js"

export const createOrder = async ( req , res ) => {
    const {address} = req.body
    
const userId = req.user._id
try {
    
    const cartItems = await cart.findOne({ userId}).populate('products.productId')

     
    if(!cartItems || cartItems.products.length == 0)
        return res.status(400).send ({message:'çart is empty'})

    const amount = cartItems.products.reduce((sum, item) => {
    const price = item.productId.price || 0;
    return sum + price * item.quantity;
  }, 0);

    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    const razorpayOrder = await razorpay.orders.create({
        amount : amount * 100,
        currency : 'INR',
    })  

    const order = new Order({
        userId,
        items : cartItems.products,
        amount,
        OrderId : razorpayOrder.id,
        address,
        isPaid : false
    })

    await order.save()
          res.status(201).send(order)

} catch (error) {
    console.log(error)
    res.status(500).send("internal server error")
}}

// to clear cart after payment is successful

export const updateOrder = async(req,res)=>{
    const userId = req.user._id
    const {OrderId, paymentID} = req.body
    try {
        const cartData = await cart.findOne({userId})
        if(!cartData) {
            return res.status(400).send({message:"Cart is empty"})
        }
        cartData.products = []
        await cartData.save()

        const orderData = await Order.findOne({OrderId})
        if(!orderData){
            return res.status(400).send({message:"Order not found"})
        }
        orderData.isPaid = true
        orderData.PaymentId = paymentID
        await orderData.save()
        res.status(200).send({message:"Order Placed successfully"})

    } catch (error) {
        console.log(error)
        res.status(500).send("internal server error")
    }
}


// get all orders

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId").populate("items.productId").sort({ createdAt: -1 });
    res.status(200).send(orders);
  } catch (error) {
     console.log(error)
    res.status(500).send({ message: "internal Server error" });
  }
};

// get one order

export const getOneOrder = async (req, res) => {
    const userId = req.user._id
    try {
        const orders = await Order.find({userId}).populate("items.productId");
        res.status(200).send(orders)
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "internal server error"});
    }

};