import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
dotenv.config()
import product from './data/products.js'
connectDB()
const app = express()















































































app.get('/api/product', (req, res) => {
    res.json(product)
})

app.get('/api/product/:id', (req, res) => {
    const products = product.find((p) => p._id === req.params.id)
    res.json(products)
})














































const port = process.env.PORT || 8000
app.listen(port)