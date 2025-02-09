import express from 'express'
const app = express()

app.use(express.json())

import cors from 'cors'
app.use(cors())

import mongoose from 'mongoose'

import dotenv from 'dotenv'
import router from './routes/router.js'
dotenv.config()

app.use("/auth",router)

const PORT = process.env.PORT

const MONGO_URI = process.env.MONGO_URI

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

mongoose.connect(MONGO_URI).then(console.log('Connected to MongoDB')).catch(err=>console.log(err))
