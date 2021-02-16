const {Router} = require('express');
const router = Router();
const {resolve} = require('path');
const fs = require('fs/promises');

router.get("/all", (req, res) => {
    readF().then(readData => {
        const todoObj = JSON.parse(readData);
        res.json({list: todoObj.list});
    }).catch(err => res.status(500).json({message: err.message}));
});

router.get('/completeAll', (req, res) => {
    readF()
        .then(readData => {
            let todoObj = JSON.parse(readData);

            todoObj['list'] = todoObj.list.some(elem => elem.status === 'active')
                ? todoObj.list.map(element => ({...element, status: "completed"}))
                : todoObj.list.map(element => ({...element, status: "active"}));

            return writeFile(todoObj);
        }).then(() => res.end())
        .catch(err => res.status(500).json({message: err.message}));
});

router.put('/changeTodo', (req, res) => {
    readF()
        .then(readData => {
            let todoObj = JSON.parse(readData);
            const data = req.body;

            todoObj['list'] = todoObj.list.map(element => element.id === data.id
                ? {...element, status: element.status === "completed" ? "active" : 'completed'}
                : element);

            return writeFile(todoObj);
        })
        .then(() => res.end())
        .catch(err => res.status(500).json({message: err.message}));
});

router.delete('/changeTodo', (req, res) => {
    readF()
        .then(readData => {
            let todoObj = JSON.parse(readData);
            const data = req.body;

            todoObj['list'] = todoObj.list.filter(el => el.id !== data.id);

            return writeFile(todoObj);
        })
        .then(() => res.end())
        .catch(err => res.status(500).json({message: err.message}));
})

router.post('/newTodo', (req, res) => {
    readF()
        .then(readData => {
            let todoObj = JSON.parse(readData);
            const data = req.body;

            const id = todoObj.list.length > 0 ? todoObj.list[todoObj.list.length - 1].id + 1 : 1
            todoObj.list.push({id, task: data.task, status: "active", editing: false});

            return writeFile(todoObj);
        })
        .then(() => res.end())
        .catch(err => res.status(500).json({message: err.message}));
})

router.delete('/deleteCompleted', (req, res) => {
    readF()
        .then(readData => {
            let todoObj = JSON.parse(readData);

            todoObj['list'] = todoObj.list.filter(e => e.status !== 'completed');

            return writeFile(todoObj);
        })
        .then(() => res.end())
        .catch(err => res.status(500).json({message: err.message}));
})

router.post('/changeTodo', (req, res) => {
    readF()
        .then(readData => {
            let todoObj = JSON.parse(readData);
            const data = req.body;

            todoObj['list'] = todoObj.list.map(element => element.id === data.id ? {
                ...element,
                task: data.task
            } : element)

            return writeFile(todoObj);
        })
        .then(() => res.end())
        .catch(err => res.status(500).json({message: err.message}));
})

const readF = () => {
    return fs.readFile(resolve(__dirname, 'todo.json'));
}

const writeFile = (todoObj) => {
    todoObj = JSON.stringify(todoObj);
    return fs.writeFile(resolve(__dirname, 'todo.json'), todoObj);
}

module.exports = router;