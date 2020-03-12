const bcrypt = require('bcrypt');
const itemsRouter = require('express').Router()
const Item = require('../models/item');

itemsRouter.get('/', async (req, res) => {
    const items = await Item
        .find({})

    res.json(items.map(i => i.toJSON()))
})

itemsRouter.post('/', async (req, res, next) => {
    try {
        //body extracted from the item
        const { body: { name, description, price, img } } = req

        const item = new Item({
            name,
            description,
            price,
            img
        })

        const savedItem = await item.save()

        res.json(savedItem)
    } catch (e) {
        next(e)
    }
})

module.exports = itemsRouter