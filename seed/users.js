const User = require('../models/user')
const bcrypt = require('bcrypt')
const faker = require('faker');
const db = require('../db')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const plant = async () => {
  const newUsers = []
  const saltRounds = 10

  for (let i=0; i<100; i++) {
    const passwordHash = await bcrypt.hash("pass", saltRounds)
    
    let username = ''
    while (username.length <= 8) {
      username = faker.internet.userName()
    }
    const name = faker.name.findName()
    const words = name.split(' ')

    const newUser = {
      username,
      name,
      passwordHash,
      avatar: `https://ui-avatars.com/api/?name=${words[0][0]}+${words[1][0].toUpperCase()}`
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