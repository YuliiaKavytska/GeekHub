const {Router} = require('express');
const router = Router();
const {resolve} = require('path');
const fs = require('fs/promises');
const io = require('./index');

router.get("/all", (req, res) => {
    readF()
        .then(readData => {
            const todoObj = JSON.parse(readData);
            res.json({list: todoObj.list, lastTask: todoObj.lastTask});
        }).catch(err => res.status(500).json({message: err.message}));
});

router.put('/lastTask', (req, res) => {
    const data = req.body;
    readF()
        .then(readData => {
            let todoObj = JSON.parse(readData);
            todoObj['lastTask'] = data.text;
            return writeFile(todoObj);
        })
        .then(() => {
            io.emit('newTodo:wasChanged', {success: true, task: data.text});
            res.end();
        })
        .catch(err => {
            io.emit('newTodo:wasChanged', {success: false, message: err.message})
        })
})

router.get('/completeAll', (req, res) => {
    readF()
        .then(readData => {
            let todoObj = JSON.parse(readData);
            todoObj['list'] = todoObj.list.some(elem => elem.status === 'active')
                ? todoObj.list.map(element => ({...element, status: "completed"}))
                : todoObj.list.map(element => ({...element, status: "active"}));
            return writeFile(todoObj);
        })
        .then(() => {
            io.emit('all:wasCompleted', {success: true});
            res.end();
        })
        .catch(err => {
            io.emit('all:wasCompleted', {success: false, message: err.message})
        })
})

router.post('/newTodo', (req, res) => {
    const data = req.body;
    readF()
        .then(readData => {
            let todoObj = JSON.parse(readData);
            const id = todoObj.list.length > 0 ? todoObj.list[todoObj.list.length - 1].id + 1 : 1
            todoObj.list.push({id, task: data.task, status: "active", editing: false});
            todoObj['lastTask'] = '';
            return writeFile(todoObj);
        })
        .then(() => {
            io.emit('newTodo:wasAdded', {success: true, task: data.task});
            res.end();
        })
        .catch(err => io.emit('newTodo:wasAdded', {success: false, message: err.message}));
})

router.delete('/deleteCompleted', (req, res) => {
    readF()
        .then(readData => {
            let todoObj = JSON.parse(readData);
            todoObj['list'] = todoObj.list.filter(e => e.status !== 'completed');
            return writeFile(todoObj);
        })
        .then(() => {
            io.emit('completed:wasDeleted', {success: true});
            res.end();
        })
        .catch(err => io.emit('completed:wasDeleted', {success: false, message: err.message}));
})

router.delete('/changeTodo', (req, res) => {
    const data = req.body;
    readF()
        .then(readData => {
            let todoObj = JSON.parse(readData);
            todoObj['list'] = todoObj.list.filter(el => el.id !== data.id);
            return writeFile(todoObj);
        })
        .then(() => {
            io.emit('todo:wasDeleted', {id: data.id, success: true});
            res.end();
        })
        .catch(err => io.emit('todo:wasDeleted', {success: false, message: err.message}));
});

router.put('/changeTodo', (req, res) => {
    const data = req.body;
    readF()
        .then(readData => {
            let todoObj = JSON.parse(readData);
            todoObj['list'] = todoObj.list.map(element => element.id === data.id
                ? {...element, status: element.status === "completed" ? "active" : 'completed'}
                : element);
            return writeFile(todoObj);
        })
        .then(() => {
            io.emit('todoStatus:wasChanged', {id: data.id, success: true});
            res.end();
        })
        .catch(err => io.emit('todoStatus:wasChanged', {success: false, message: err.message}));
});

router.post('/changeTodo', (req, res) => {
    const data = req.body;
    readF()
        .then(readData => {
            let todoObj = JSON.parse(readData);
            todoObj['list'] = todoObj.list.map(element =>
                element.id === data.id
                    ? {...element, task: data.task}
                    : element)
            return writeFile(todoObj);
        })
        .then(() => {
            io.emit('todo:wasChanged', {success: true, id: data.id, task: data.task});
            res.end();
        })
        .catch(err => io.emit('todo:wasChanged', {success: false, message: err.message}));
})

const readF = () => {
    return fs.readFile(resolve(__dirname, 'todo.json'));
}

const writeFile = (todoObj) => {
    todoObj = JSON.stringify(todoObj);
    return fs.writeFile(resolve(__dirname, 'todo.json'), todoObj);
}

module.exports = router;