import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import {router} from './routes/router.js'
import { dbConnection } from './lib/connect.js'
import cookieParser from 'cookie-parser'

// Loads .env file contents into process.env by default

dotenv.config()

dbConnection()

const server = express()

server.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true // allows cookies and other credentials
}))
server.use(express.json())
server.use(cookieParser())
server.use(router)

server.use('/uploads', express.static( 'uploads'));


const port = 4001 || process.env.PORT

server.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})


server.get('/',(req,res)=>{
    res.send(`<h1>Server is running</h1>`)
})
