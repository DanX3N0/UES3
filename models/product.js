const mongoose = require('mongoose')

const product = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: true,
    },
  },
  { collection: 'products' }
)

const Product = mongoose.model('Product', product)

module.exports = Product
