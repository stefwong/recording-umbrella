const bcrypt = require('bcrypt');
const usersRouter = require('express').Router()
const User = require('../models/user');

usersRouter.get('/', async (req, res) => {
  const users = await User
    .find({})

  res.json(users.map(u => u.toJSON()))
})

usersRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params

  try {
    const user = await User.findById(id).populate('items', {})

    if (user) {
      res.json(user.toJSON())
    } else {
      res.status(404).end()
    }
  } catch (e) {
    next(e)
  }
})

usersRouter.post('/', async (req, res, next) => {
  const { body: { username, name, password, avatar } } = req
  
  try {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
      avatar: avatar || 'https://ui-avatars.com/api/?name=Dummy+Avatar'
    })

    const savedUser = await user.save()

    res.json(savedUser.toJSON())
  } catch (e) {
    next(e)
  }
})

usersRouter.put('/', async (req, res, next) => {
  const { body: { username, password, newPassword } } = req

  const user = await User.findOne({ username })
  const passwordCorrect =
    user === null ? false
      : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(newPassword, saltRounds)

  const newUser = {
    username,
    name: user.name,
    passwordHash,
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(user._id, newUser, { new: true, runValidators: true, context: 'query' })
    res.json(updatedUser.toJSON())
  } catch (e) {
    next(e)
  }
})

usersRouter.delete('/', async (req, res, next) => {
  try {
    await User.deleteMany()
    res.status(204).end()
  } catch (e) {
    next(e)
  }
})

module.exports = usersRouter