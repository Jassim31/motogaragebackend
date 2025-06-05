import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import {router} from './routes/router.js'
import { dbConnection } from './lib/connect.js'

// Loads .env file contents into process.env by default

dotenv.config()

dbConnection()

const server = express()

server.use(cors())
server.use(express.json())
server.use(router)

const port = 4000 || process.env.PORT

server.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
server.get('/',(req,res)=>{
    res.send(`<h1>Server is running</h1>`)
})