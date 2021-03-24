const {Router} = require('express');
const router = Router();
const {resolve} = require('path');
const fs = require('fs/promises');

router.post('/getUser', (req, res) => {
    readContacts()
        .then(readData => {
            const users = JSON.parse(readData)
            const {body: {id}} = req

            let user = findUser(users, id)
            delete user.password

            if (!user) {
                throw new Error('User doesnt exist')
            }
            res.json({data: user})
        })
        .catch(err => res.status(500).json({message: err.message}))
})

router.put('/user/favorite', (req, res) => {
    readContacts()
        .then(readData => {
            const users = JSON.parse(readData)
            const {body: {userId, id}} = req
            const user = findUser(users, userId)

            if (user.favorites) {
                user.favorites.push(id)
            } else {
                user.favorites = [id]
            }
            return writeFile(users)
        })
        .then(() => res.end())
        .catch(err => res.status(500).json({message: err.message}))
})

router.delete('/user/favorite', (req, res) => {
    readContacts()
        .then(readData => {
            const users = JSON.parse(readData)
            const {body: {userId, id}} = req

            const user = findUser(users, userId)
            user.favorites = user.favorites.filter(e => e !== id)
            return writeFile(users)
        })
        .then(() => res.end())
        .catch(err => res.status(500).json({message: err.message}))
})

router.delete('/user/contact', (req, res) => {
    readContacts()
        .then(readData => {
            let users = JSON.parse(readData)
            const {body: {userId, id}} = req
            let user = findUser(users, userId)
            user.contacts = user.contacts.filter(e => e.id !== id)
            user.favorites = user.favorites.filter(e => e !== id)

            return writeFile(users)
        })
        .then(() => res.end())
        .catch(err => res.status(500).json({message: err.message}))
})

router.put('/user/contact/edit', (req, res) => {
    readContacts()
        .then(readData => {
            const users = JSON.parse(readData)
            let {userId, data} = req.body
        })
        .catch(err => res.status(500).json({message: err.message}))
})

function findUser(arr, id) {
    return arr.find(e => e.id === id)
}

function writeFile(obj) {
    return fs.writeFile(resolve(__dirname, 'contacts.json'), JSON.stringify(obj, null, 2))
}

function readContacts() {
    return  fs.readFile(resolve(__dirname, 'contacts.json'))
}

module.exports = router