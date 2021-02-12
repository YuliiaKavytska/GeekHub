const {Router} = require('express');
const router = Router();
const {resolve} = require('path');
const fs = require('fs/promises');
let todoObj = require('./todo.json');

router.get("/all", (req, res) => {
    try {
        res.status(200).json({list: todoObj.list, resultCode: 0});
    } catch (err) { returnError(res, err) }
});

router.get('/completeAll', (req, res) => {
    try {
        todoObj['list'] = todoObj.list.some(elem => elem.status === 'active')
            ? todoObj.list.map(element => ({...element, status: "completed"}))
            : todoObj.list.map(element => ({...element, status: "active"}));
        writeFile(todoObj, res);
    } catch (err) { returnError(res, err) }
});

router.put('/changeTodo', (req, res) => {
    try {
        const data = req.body;
        todoObj['list'] = todoObj.list.map(element => element.id === data.id
            ? {...element, status: element.status === "completed" ? "active" : 'completed'}
            : element);
        writeFile(todoObj, res);
    } catch (err) { returnError(res, err) }
});

router.delete('/changeTodo', (req, res) => {
    try {
        const data = req.body;
        todoObj['list'] = todoObj.list.filter(el => el.id !== data.id);
        writeFile(todoObj, res);
    } catch (err) { returnError(res, err) }
})

router.post('/newTodo', (req, res) => {
    try {
        const data = req.body;
        const id = todoObj.list.length > 0 ? todoObj.list[todoObj.list.length - 1].id + 1 : 1
        todoObj.list.push({id, task: data.task, status: "active", editing: false});
        writeFile(todoObj, res);
    } catch (err) { returnError(res, err) }
})

router.delete('/deleteCompleted', (req, res) => {
    try {
        todoObj['list'] = todoObj.list.filter(e => e.status !== 'completed');
        writeFile(todoObj, res);
    } catch (err) { returnError(res, err) }
})

router.post('/changeTodo', (req, res) => {
    try {
        const data = req.body;
        todoObj['list'] = todoObj.list.map(element => element.id === data.id ? {
            ...element,
            task: data.task
        } : element)
        writeFile(todoObj, res);
    } catch (err) { returnError(res, err) }
})

function writeFile(todoObj, res) {
    todoObj = JSON.stringify(todoObj);
    fs.writeFile(resolve(__dirname, 'todo.json'), todoObj).then(() => {
        res.status(200).json({resultCode: 0});
    })
}

function returnError(res, err) {
    console.log(err);
    res.status(500).json({message: "Something wrong", resultCode: 1});
}

module.exports = router;