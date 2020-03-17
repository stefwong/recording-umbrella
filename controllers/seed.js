const bcrypt = require('bcrypt');
const seedRouter = require('express').Router()
const User = require('../models/user');
const Item = require('../models/item');

seedRouter.post('/randomAssign', async (req, res, next) => {
    try {
        // gets all items
        const items = await Item
            .find({})
        // gets users
        const users = await User
            .find({})

        // loops through all items
        for (let i = 0; i < items.length; i++) {

            // randomly selects one of the first 10 users
            // assigns each to random user
            let random = Math.floor(Math.random() * 10);

            // assigns item to that randomly selected user
            users[random].items.push(items[i]);
            items[i].owner = users[i].id;

            await items[i].save();
        }

        for (let i = 0; i < 10; i++) {
            await users[i].save();
        }
        res.status(200).end();
    } catch (e) {
        next(e)
    }
})

seedRouter.post('/randomUsers', async (req, res, next) => {
    try {

        let users = [
            { username: "sarahbrown", name: "sarah brown ", password: "sarahb123", avatar: "https://images.unsplash.com/photo-1518551049835-5536abd7e004?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80" },
            { username: "johnmayer", name: "john mayer", password: "johnm123", avatar: "https://images.unsplash.com/photo-1520975764749-7397d17130a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80" },
            { username: "kennyzheng", name: "kenny zheng", password: "kenny123", avatar: "https://images.unsplash.com/photo-1536057222397-e51989d3cb8a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60" }];
        const { body: { username, name, password } } = req

        let newUsers = [];
        for (let i = 0; i < users.length; i++) {
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(users[i].password, saltRounds)

            const user = new User({
                username: users[i].username,
                name: users[i].name,
                passwordHash: passwordHash,
                avatar: users[i].avatar
            })

            const savedUser = await user.save();
            newUsers.push(savedUser);
        }

        const result = { users: newUsers };
        res.json(JSON.stringify(result));
    } catch (e) {
        next(e)
    }
})

module.exports = seedRouter