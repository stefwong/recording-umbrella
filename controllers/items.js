const itemsRouter = require('express').Router()
var User = require('../models/user');
const Item = require('../models/item');
const jwt = require('jsonwebtoken');

const getTokenFrom = req => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

itemsRouter.get('/', async (req, res) => {
    const items = await Item
        .find({}).populate('owner')

    res.json(items.map(itm => itm.toJSON()))
})

itemsRouter.get('/:id', async (req, res, next) => {
    const { id } = req.params

    try {
        const item = await Item.findById(id)
        if (item) {
            res.json(item.toJSON())
        } else {
            res.status(404).end()
        }
    } catch (e) {
        next(e)
    }
})

itemsRouter.post('/', async (req, res, next) => {
    const { body: { name, description, price, img } } = req
    const token = getTokenFrom(req)
    
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)

        if (!token || !decodedToken.id) {
            return res.status(401).json({ error: 'token missing or invalid' })
        }
        
        const user = await User.findById(decodedToken.id)

        const item = new Item({
            name,
            description,
            price,
            img,
            date: new Date(),
            ownerId: user._id
        })

        const savedItem = await item.save()
        user.items = user.items.concat(savedItem._id)
        await user.save()
        res.json(savedItem.toJSON())
    } catch (e) {
        next(e)
    }
})

itemsRouter.post('/buy/:id', async (req, res, next) => {
    const { id } = req.params
    const token = getTokenFrom(req)
    
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        
        if (!token || !decodedToken.id) {
            return res.status(401).json({ error: 'token missing or invalid' })
        }
        
        const user = await User.findById(decodedToken.id)

        const item = await Item.findById(id)
        if (item) {
            const { ownerId } = item
            const itemOwner = await User.findById(ownerId.toString())
            itemOwner.items = itemOwner.items.filter(itm => {
                return itm._id.toString() !== item._id.toString()
            })
            await itemOwner.save()

            item.soldBy = item.soldBy.concat(ownerId)
            item.ownerId = user._id

            user.items = user.items.concat(item._id)
            await user.save()
            
            const itemPurchased = await item.save()
            res.json(itemPurchased.toJSON())
        } else {
            res.status(404).end()
        }
    } catch (e) {
        next(e)
    }
})

itemsRouter.put('/:id', async (req, res, next) => {
    const { body: { name, description, price, img } } = req
    const { id } = req.params
    
    const existingItem = await Item.findById(id)

    const item = {
        name: name || existingItem.name,
        description: description || existingItem.description,
        price: price || existingItem.price,
        img: img || existingItem.img
    }

    try {
        const updatedItem = await Item.findByIdAndUpdate(id, item, { new: true, runValidators: true, context: 'query' })
        res.json(updatedItem.toJSON())
    } catch (e) {
        next(e)
    }
})

itemsRouter.delete('/:id', async (req, res, next) => {
    const { id } = req.params
    
    try {
        await Item.findByIdAndDelete(id)
        res.status(204).end()
    } catch (e) {
        next(e)
    }
})

itemsRouter.delete('/', async (req, res, next) => {
    try {
        await Item.deleteMany()
        res.status(204).end()
    } catch (e) {
        next(e)
    }
})

module.exports = itemsRouter