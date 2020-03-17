const User = require('../models/user')
const bcrypt = require('bcrypt')
const faker = require('faker');
const db = require('../db')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const plant = async () => {
  const newUsers = []
  const saltRounds = 10

  for (let i=0; i<100; i++) {
    const passwordHash = await bcrypt.hash("'", saltRounds)
    
    let username = ''
    while (username.length <= 8) {
      username = faker.internet.userName()
    }

    const newUser = {
      username,
      name: faker.name.findName(),
      passwordHash
    }

    newUsers.push(newUser)
  }
  
  await User.insertMany(newUsers)
}

const run = async () => {
  await plant()
  db.close()
}

run()