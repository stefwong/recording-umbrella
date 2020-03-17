const User = require('../models/user')
const Item = require('../models/item')
const faker = require('faker');
const db = require('../db')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const plant = async () => {
  const rootUserId = '5e703d44c0877774237f63fb'
  const rootUser = await User.findById(rootUserId)
  
  const newItems = []
  const imgUrl = 'https://i.picsum.photos/id'

  for (let i=0; i<72; i++) {
    const randomImgId = faker.random.number(1080)

    const item = new Item({ 
      name: faker.commerce.productName(),
      description: faker.commerce.productAdjective(),
      price: faker.random.number(21000),
      imgUrl: `${imgUrl}/${randomImgId}/200/300.jpg`,
      category: 'misc',
      ownerId: rootUserId
    })

    const newItem = await item.save()
    newItems.push(newItem._id)
  }

  rootUser.items = rootUser.items.concat(newItems)
  await rootUser.save()
}

const run = async () => {
  await plant()
  db.close()
}

run()