const {Router} = require('express');
const router = Router();
const {resolve} = require('path');
const fs = require('fs/promises');

router.get("/all", (req, res) => {
    fs.readFile(resolve(__dirname, 'todo.json'))
        .then(readData => {
        const todoObj = JSON.parse(readData);
        res.json({list: todoObj.list, lastTask: todoObj.lastTask});
    }).catch(err => res.status(500).json({message: err.message}));
});

module.exports = router;