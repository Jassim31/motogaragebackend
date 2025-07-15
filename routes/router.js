import express from 'express'
import { checkAuth, googleSignIn, login, logout, register } from '../controllers/authController.js'
import { protectRoute } from '../middleWare/authMiddleWare.js'
import { addProduct, deleteProduct, editProduct, getProduct } from '../controllers/productController.js'
import { multerConfig } from '../middleWare/multerMiddleWare.js'
import { addToCart, getCart } from '../controllers/cartController.js'
import { createOrder, getAllOrders, getOneOrder, updateOrder } from '../controllers/orderController.js'

export const router = new express.Router()


router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)

// add product

router.post('/add/product',protectRoute,multerConfig.single('image'),addProduct)

router.get('/get/products',getProduct)

// edit product

router.put('/edit/product/:id',protectRoute,multerConfig.single('image'),editProduct)

// delete product

router.delete('/product/delete/:id',protectRoute,deleteProduct)

router.get("/check",protectRoute,checkAuth)


// cart
router.post("/add/cart",protectRoute,addToCart)

// get cart
router.get("/get/cart",protectRoute,getCart)

// create order
router.post("/create/order",protectRoute,createOrder)

// update order
router.put("/order/update",protectRoute,updateOrder)

// getAllorders (admin)
router.get("/order/view",protectRoute,getAllOrders)

// getOneOrder
router.get("/get/order",protectRoute,getOneOrder)

// google sign in 
router.post('/google/signin',googleSignIn)