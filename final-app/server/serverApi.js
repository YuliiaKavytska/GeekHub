const {Router} = require('express');
const router = Router();
const {resolve} = require('path');
const fs = require('fs/promises');

router.post('/getUser', (req, res) => {
    fs.readFile(resolve(__dirname, 'contacts.json'))
        .then(readData => {
            const jsonData = JSON.parse(readData)
            const users = jsonData.users
            const reqData = req.body

            let user = users.find(e => e.id === reqData.id)
            delete user.password
            console.log(user)
            if (!user) {
                throw new Error('User doesnt exist')
            }
            res.json({data: user})
        })
        .catch(err => res.status(500).json({api: 'login', message: err.message}))
})

module.exports = router