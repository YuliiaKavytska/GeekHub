const {Router} = require('express');
const router = Router();
const {resolve} = require('path');
const fs = require('fs/promises');
// "/all"
router.get("/all", (req, res) => {
    try {
        fs.readFile(resolve(__dirname, 'todo.json')).then(response => {
            const todoObj = JSON.parse(response);
            res.status(200).json({list: todoObj.list, resultCode: 0});
        })
    } catch (err) {
        res.status(500).json({message: "Something wrong", resultCode: 1});
    }
});

router.get('/completeAll', (req, res) => {
    try {
        fs.readFile(resolve(__dirname, 'todo.json')).then(response => {
            let todoObj = JSON.parse(response);
            todoObj['list'] = todoObj.list.some(elem => elem.status === 'active')
                ? todoObj.list.map(element => ({...element, status: "completed"}))
                : todoObj.list.map(element => ({...element, status: "active"}));
            todoObj = JSON.stringify(todoObj);
            fs.writeFile(resolve(__dirname, 'todo.json'), todoObj).then(() => {
                res.status(200).json({resultCode: 0});
            })
        })
    } catch (err) {
        res.status(500).json({message: "Something wrong", resultCode: 1});
    }
});

router.put('/changeTodo', (req, res) => {
    try {
        const data = req.body;
        fs.readFile(resolve(__dirname, 'todo.json')).then(response => {
            let todoObj = JSON.parse(response);
            todoObj['list'] = todoObj.list.map(element => element.id === data.id
                ? {...element, status: element.status === "completed" ? "active" : 'completed'}
                : element);
            todoObj = JSON.stringify(todoObj);
            fs.writeFile(resolve(__dirname, 'todo.json'), todoObj).then(() => {
                res.status(200).json({resultCode: 0});
            })
        })
    } catch (err) {
        res.status(500).json({message: "Something wrong", resultCode: 1});
    }
});

router.delete('/changeTodo', (req, res) => {
    try {
        const data = req.body;
        fs.readFile(resolve(__dirname, 'todo.json')).then(response => {
            let todoObj = JSON.parse(response);
            todoObj['list'] = todoObj.list.filter(el => el.id !== data.id);
            todoObj = JSON.stringify(todoObj);
            fs.writeFile(resolve(__dirname, 'todo.json'), todoObj).then(() => {
                res.status(200).json({resultCode: 0})
            })
        })
    } catch (err) {
        res.status(500).json({message: "Something wrong", resultCode: 1});
    }
})

router.post('/newTodo', (req, res) => {
    try {
        const data = req.body;
        fs.readFile(resolve(__dirname, 'todo.json')).then(response => {
            let todoObj = JSON.parse(response);
            const id = todoObj.list.length > 0 ? todoObj.list[todoObj.list.length - 1].id + 1 : 1
            todoObj.list.push({id, task: data.task, status: "active", editing: false});
            todoObj = JSON.stringify(todoObj);
            fs.writeFile(resolve(__dirname, 'todo.json'), todoObj).then(() => {
                res.status(200).json({resultCode: 0});
            })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Something wrong", resultCode: 1});
    }
})

router.delete('/deleteCompleted', (req, res) => {
    try {
        fs.readFile(resolve(__dirname, 'todo.json')).then(response => {
            let todoObj = JSON.parse(response);
            todoObj['list'] = todoObj.list.filter(e => e.status !== 'completed')
            todoObj = JSON.stringify(todoObj);
            fs.writeFile(resolve(__dirname, 'todo.json'), todoObj).then(() => {
                res.json({resultCode: 0});
            })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Something wrong", resultCode: 1});
    }
})

router.post('/changeTodo', (req, res) => {
    try {
        const data = req.body;
        fs.readFile(resolve(__dirname, 'todo.json')).then(response => {
            let todoObj = JSON.parse(response);
            todoObj['list'] = todoObj.list.map(element => element.id === data.id ? {
                ...element,
                task: data.task
            } : element)
            todoObj = JSON.stringify(todoObj);
            fs.writeFile(resolve(__dirname, 'todo.json'), todoObj).then(() => {
                res.json({resultCode: 0});
            })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Something wrong", resultCode: 1});
    }
})

module.exports = router;