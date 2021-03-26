const {Router} = require('express');
const router = Router();
const {resolve} = require('path');
const fs = require('fs/promises');

const multer = require('multer')

const bcrypt = require('bcrypt');
const saltRounds = 10;

const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
})
const upload = multer({storage: fileStorage}).single('avatar')

router.post('/getUser', async (req, res) => {
    try {
        const readData = await readContacts()
        const users = JSON.parse(readData)
        const {body: {email, password}} = req
    
        let user = findUser(users, email, 'email')

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
    // readContacts()
    //     .then(readData => {
    //         const users = JSON.parse(readData)
    //         const {body: {email, password}} = req
    //         console.log(req.body)
    //         let user = findUser(users, email, 'email')
    //         console.log(user)
    //         if (!user) {
    //             throw new Error('User doesnt exist')
    //         }
    //
    //         bcrypt.compare(password, user.password).then(result => {
    //             if (result) {
    //                 delete user.password
    //                 res.json({data: user})
    //             } else {
    //                 throw new Error('Login or password is wrong')
    //             }
    //         }).catch((err) => {
    //             console.log('error bycrypt')
    //             res.status(500).json({message: err.message})
    //         })
    //     })
    //     .catch((err) => res.status(500).json({message: err.message}))
})

router.post('/register', async (req, res) => {
    try {
        const readData = await readContacts()
        const users = JSON.parse(readData)
        const {body: {email, password, name}} = req
        const user = findUser(users, email, 'email')
        if (user) {
            throw new Error(`User with email: ${email} already exist. Log In, please`)
        }
        let newUser = {
            id: users[users.length - 1].id + 1,
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
        console.log('error reg')
        res.status(500).json({message: err.message})
    }
    // readContacts()
    //     .then(readData => {
    //         const users = JSON.parse(readData)
    //         const {body: {email, password, name}} = req
    //         const user = findUser(users, email, 'email')
    //         if (user) {
    //             throw new Error(`User with email: ${email} already exist. Log In, please`)
    //         }
    //         let newUser = {
    //             id: users[users.length - 1].id + 1,
    //             name,
    //             email,
    //             favorites: null,
    //             contacts: null
    //         }
    //         bcrypt.hash(password, saltRounds).then(hashedPassword => {
    //             newUser.password = hashedPassword
    //             users.push(newUser)
    //
    //             return writeFile(users).then(() => res.end())
    //         }).catch((err) => {
    //             console.log('error bycrypt')
    //             res.status(500).json({message: err.message})
    //         })
    //     }).catch((err) => {
    //     console.log('error reg')
    //     res.status(500).json({message: err.message})
    // })
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

router.post('/user/contact/edit', upload, (req, res) => {
    readContacts()
        .then(readData => {
            let users = JSON.parse(readData)
            let {file, body: {userId, ...contactInfo}} = req

            contactInfo.id = JSON.parse(contactInfo.id)

            if (file) {
                contactInfo.avatar = '/' + file.originalname
            }
            contactInfo.phones = JSON.parse(contactInfo.phones)

            const user = findUser(users, +userId);
            const contactIndex = user.contacts.findIndex(e => e.id === contactInfo.id)
            user.contacts[contactIndex] = contactInfo
            return writeFile(users)
        })
        .then(() => res.end())
        .catch(err => res.status(500).json({message: err.message}))
})

router.post('/user/contact/new', upload, (req, res) => {
    readContacts()
        .then(readData => {
            let users = JSON.parse(readData)
            let {file, body: {userId, ...contactInfo}} = req
            let user = findUser(users, +userId)

            contactInfo.id = JSON.parse(contactInfo.id)
            if (file) {
                contactInfo.avatar = '/' + file.originalname
            }
            contactInfo.phones = JSON.parse(contactInfo.phones)
            if (user.contacts) {
                user.contacts.push(contactInfo)
            } else {
                user.contacts = [contactInfo]
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