const notesRouter = require('express').Router()
const Note = require('../models/note');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

notesRouter.get('/', async (req, res) => {
  const notes = await Note
    .find({}).populate('user', { username: 1, name: 1 })

  res.json(notes.map(note => note.toJSON()))
})

notesRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const note = await Note.findById(id)
    if (note) {
      res.json(note.toJSON())
    } else {
      res.status(404).end()
    }
  } catch (e) {
    next(e)
  }
})

notesRouter.post('/', async (req, res, next) => {
  const { body: { content, important } } = req
  const token = getTokenFrom(req)

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const note = new Note({
      content,
      important: important === undefined ? false : important,
      date: new Date(),
      user: user._id
    })

    const savedNote = await note.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()
    res.json(savedNote.toJSON())
  } catch (e) {
    next(e)
  }
})

notesRouter.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    await Note.findByIdAndDelete(id)
    res.status(204).end()
  } catch (e) {
    next(e)
  }
})

notesRouter.put('/:id', async (req, res, next) => {
  const { body: { content, important } } = req
  const { id } = req.params

  const note = {
    content,
    important
  }

  try {
    const updatedNote = await Note.findByIdAndUpdate(id, note, { new: true, runValidators: true, context: 'query' })
    res.json(updatedNote.toJSON())
  } catch (e) {
    next(e)
  }
})

module.exports = notesRouter