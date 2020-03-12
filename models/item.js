const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const itemSchema = mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  img: String,
  userId: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ,
})

itemSchema.plugin(uniqueValidator)

itemSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item