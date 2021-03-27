const {Router} = require('express')
const router = Router()
const {resolve} = require('path')
const fs = require('fs/promises')
const multer = require('multer')

const bcrypt = require('bcrypt')
const saltRounds = 10

const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
            cb(null, true)
        } else {
            cb(null, false)
        }
    }
})
const upload = multer({storage: fileStorage}).single('avatar')

router.post('/getUser', async (req, res) => {
    try {
        const readData = await readContacts()
        const users = JSON.parse(readData)
        const {body: {email, password}} = req

        const user = findUser(users, email, 'email')

        if (!user) {
            throw new Error('User doesnt exist')
        }

        if (await bcrypt.compare(password, user.password)) {
            delete user.password
            res.json({data: user})
        } else {
            throw new Error('Login or password is wrong')
        }
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.post('/signUp', async (req, res) => {
    try {
        const readData = await readContacts()
        const users = JSON.parse(readData)
        const {body: {email, password, name}} = req
        const user = findUser(users, email, 'email')

        if (user) {
            throw new Error(`User with email: ${email} already exist. Log In, please`)
        }

        let lastId
        if (users.length > 0) {
            lastId = users[users.length - 1].id + 1
        } else {
            lastId = 1
        }

        const newUser = {
            id: lastId,
            name,
            email,
            favorites: null,
            contacts: null
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        newUser.password = hashedPassword
        users.push(newUser)

        await writeFile(users)
        res.end()
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.put('/user/:userId/favorite/:id', (req, res) => {
    readContacts()
        .then(readData => {
            const users = JSON.parse(readData)
            const {params: {userId, id}} = req
            const user = findUser(users, +userId)

            if (user.favorites) {
                user.favorites.push(+id)
            } else {
                user.favorites = [+id]
            }
            return writeFile(users)
        })
        .then(() => res.end())
        .catch(err => res.status(500).json({message: err.message}))
})

router.delete('/user/:userId/favorite/:id', (req, res) => {
    readContacts()
        .then(readData => {
            const users = JSON.parse(readData)
            const {params: {userId, id}} = req

            const user = findUser(users, +userId)
            user.favorites = user.favorites.filter(e => e !== +id)
            return writeFile(users)
        })
        .then(() => res.end())
        .catch(err => res.status(500).json({message: err.message}))
})

router.delete('/user/:userId/contact/:id', (req, res) => {
    readContacts()
        .then(readData => {
            let users = JSON.parse(readData)
            const {params: {userId, id}} = req

            let user = findUser(users, +userId)
            user.contacts = user.contacts.filter(e => e.id !== +id)
            user.favorites = user.favorites.filter(e => e !== +id)

            return writeFile(users)
        })
        .then(() => res.end())
        .catch(err => res.status(500).json({message: err.message}))
})

router.post('/user/:userId/contact/edit', upload, (req, res) => {
    readContacts()
        .then(readData => {
            let users = JSON.parse(readData)
            let {file, body, params: {userId}} = req
            body.id = JSON.parse(body.id)

            if (file) {
                body.avatar = '/' + file.originalname
            }
            body.phones = JSON.parse(body.phones)

            const user = findUser(users, +userId)
            const contactIndex = user.contacts.findIndex(e => e.id === body.id)
            user.contacts[contactIndex] = body
            return writeFile(users)
        })
        .then(() => res.end())
        .catch(err => res.status(500).json({message: err.message}))
})

router.post('/user/:userId/contact/new', upload, (req, res) => {
    readContacts()
        .then(readData => {
            let users = JSON.parse(readData)
            let {file, body, params: {userId}} = req
            let user = findUser(users, +userId)

            if (file) {
                body.avatar = '/' + file.originalname
            }

            body.id = JSON.parse(body.id)
            body.phones = JSON.parse(body.phones)

            if (user.contacts) {
                user.contacts.push(body)
            } else {
                user.contacts = [body]
            }

            return writeFile(users)
        })
        .then(() => res.end())
        .catch(err => res.status(500).json({message: err.message}))
})

function findUser(arr, prop, propName = 'id') {
    return arr.find(element => element[propName] === prop)
}

function writeFile(obj) {
    return fs.writeFile(resolve(__dirname, 'contacts.json'), JSON.stringify(obj, null, 2))
}

function readContacts() {
    return fs.readFile(resolve(__dirname, 'contacts.json'))
}

module.exports = router