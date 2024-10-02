import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'


import {notFound, handleError} from './middlewear/errorHandler.js'
dotenv.config()

connectDB()
const app = express()


//Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//cookie Parser middleware
app.use(cookieParser())


app.use('/api/product', productRoutes)
app.use('/api/user', userRoutes)


app.use(notFound)
app.use(handleError)






























































































































const port = process.env.PORT || 8000
app.listen(port)