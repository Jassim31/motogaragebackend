import express from 'express'
import { register } from '../controllers/authController.js'

export const router = new express.Router()


router.post("/register",register)