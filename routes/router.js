import express from 'express'
import { checkAuth, login, logout, register } from '../controllers/authController.js'
import { protectRoute } from '../middleWare/authMiddleWare.js'
import { addProduct, deleteProduct, editProduct, getProduct } from '../controllers/productController.js'
import { multerConfig } from '../middleWare/multerMiddleWare.js'

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