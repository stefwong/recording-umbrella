const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  content: {
    type: String, 
    required: true,
    minlength: 5
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  date: Date,
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note