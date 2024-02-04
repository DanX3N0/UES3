const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const Product = require('./models/product')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/catalog', async (req, res) => {
  try {
    const products = await Product.find({})
    res.status(200).json({ products })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.get('/catalog/:id', async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id)
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/catalog', async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.put('/catalog/:id', async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndUpdate(id, req.body)

    if (!product) {
      return res.status(404).json({ message: 'No se hallo el producto.' })
    }

    const newProduct = await Product.findById(id)
    res.status(200).json(newProduct)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.delete('/catalog/:id', async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndDelete(id)

    if (!product) {
      return res
        .status(404)
        .json({ message: 'No se logro eliminar el producto.' })
    }
    res.status(200).json(producto)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

mongoose.set('strictQuery', false)
mongoose
  .connect(
    'mongodb+srv://D9393A:A213PPursus@backend.rji0kdx.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Conexion con la DB establecida.')
    const HOST = 'localhost'
    const PORT = 3000
    app.listen(PORT, HOST, () => {
      console.log(`Server run on http://${HOST}:${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
