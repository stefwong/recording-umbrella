const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    default: 1
  },
  img: String,
  date: Date,
  category: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  forSale: {
    type: Boolean,
    default: false
  },
  soldBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
})

itemSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item