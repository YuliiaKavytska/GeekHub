const express = require('express');
const server = express();
const port = process.env.prot || 8000;
const {resolve} = require('path');
const fs = require('fs/promises');
const bodyParser = require("body-parser");

server.use(bodyParser.json());

// ПРОБОВАЛА ТАКИЕ ВАРИАНТЫ:
// /^\/(all|active|completed|todo)/ - аналогично регулярке со всем проверками
// '/all - не видит никаких других роутов
// /:filter(active|all|todo|completed)?/:id(\d+)?/:edit(edit)? - возвращает пустую страницу так как в ответе приходит HTML

server.get("/:filter(active|all|todo|completed)?/:id(\\d+)?/:edit(edit)?", (req, res) => {
    if (req.xhr) {
        fs.readFile(resolve(__dirname, 'todo.json')).then(response => {
            const todoObj = JSON.parse(response);
            res.setHeader('Content-Type', 'application/json');
            const resp = {list: todoObj.list, resultCode: 0};
            res.json(resp);
        }).catch((err) => {
            console.log(err);
            res.json({resultCode: 1});
        })
    } else {
        res.sendFile(resolve(__dirname, '..', 'client', 'build', 'index.html'))
    }
});

server.use('/', express.static(resolve(__dirname, '..', 'client', 'build')));

server.get("*", (req, res) => {
    res.sendFile(resolve(__dirname, '..', 'client', 'build', 'index.html'))
});

server.get('/completeAll', (req, res) => {
    fs.readFile(resolve(__dirname, 'todo.json')).then(response => {
        let todoObj = JSON.parse(response);
        todoObj['list'] = todoObj.list.some(elem => elem.status === 'active')
            ? todoObj.list.map(element => ({...element, status: "completed"}))
            : todoObj.list.map(element => ({...element, status: "active"}));
        todoObj = JSON.stringify(todoObj);
        fs.writeFile(resolve(__dirname, 'todo.json'), todoObj).then(() => {
            res.json({resultCode: 0});
        }).catch((err) => {
            console.log(err);
            res.json({resultCode: 1});
        })
    }).catch((err) => {
        console.log(err);
        res.json({resultCode: 1});
    })
});

server.put('/changeTodo', (req, res) => {
    const data = req.body;
    fs.readFile(resolve(__dirname, 'todo.json')).then(response => {
        let todoObj = JSON.parse(response);
        todoObj['list'] = todoObj.list.map(element => element.id === data.id
            ? {...element, status: element.status === "completed" ? "active" : 'completed'}
            : element);
        todoObj = JSON.stringify(todoObj);
        fs.writeFile(resolve(__dirname, 'todo.json'), todoObj).then(() => {
            res.json({resultCode: 0});
        }).catch((err) => {
            console.log(err);
            res.json({resultCode: 1});
        })
    }).catch((err) => {
        console.log(err);
        res.json({resultCode: 1});
    })
});

server.delete('/changeTodo', (req, res) => {
    const data = req.body;
    fs.readFile(resolve(__dirname, 'todo.json')).then(response => {
        let todoObj = JSON.parse(response);
        todoObj['list'] = todoObj.list.filter(el => el.id !== data.id);
        todoObj = JSON.stringify(todoObj);
        fs.writeFile(resolve(__dirname, 'todo.json'), todoObj).then(() => {
            res.json({resultCode: 0})
        }).catch((err) => {
            console.log(err);
            res.json({resultCode: 1});
        })
    }).catch((err) => {
        console.log(err);
        res.json({resultCode: 1});
    })
})

server.post('/newTodo', (req, res) => {
    const data = req.body;
    fs.readFile(resolve(__dirname, 'todo.json')).then(response => {
        let todoObj = JSON.parse(response);
        const id = todoObj.list.length > 0 ? todoObj.list[todoObj.list.length - 1].id + 1 : 1
        todoObj.list.push({id, task: data.task, status: "active", editing: false});
        todoObj = JSON.stringify(todoObj);
        fs.writeFile(resolve(__dirname, 'todo.json'), todoObj).then(() => {
            res.json({resultCode: 0});
        }).catch((err) => {
            console.log(err);
            res.json({resultCode: 1});
        })
    }).catch((err) => {
        console.log(err);
        res.json({resultCode: 1});
    })
})

server.delete('/deleteCompleted', (req, res) => {
    fs.readFile(resolve(__dirname, 'todo.json')).then(response => {
        let todoObj = JSON.parse(response);
        todoObj['list'] = todoObj.list.filter(e => e.status !== 'completed')
        todoObj = JSON.stringify(todoObj);
        fs.writeFile(resolve(__dirname, 'todo.json'), todoObj).then(() => {
            res.json({resultCode: 0});
        }).catch((err) => {
            console.log(err);
            res.json({resultCode: 1});
        })
    }).catch((err) => {
        console.log(err);
        res.json({resultCode: 1});
    })
})

server.post('/changeTodo', (req, res) => {
    const data = req.body;
    fs.readFile(resolve(__dirname, 'todo.json')).then(response => {
        let todoObj = JSON.parse(response);
        todoObj['list'] = todoObj.list.map(element => element.id === data.id ? {...element, task: data.task} : element)
        todoObj = JSON.stringify(todoObj);
        fs.writeFile(resolve(__dirname, 'todo.json'), todoObj).then(() => {
            res.json({resultCode: 0});
        }).catch((err) => {
            console.log(err);
            res.json({resultCode: 1});
        })
    }).catch((err) => {
        console.log(err);
        res.json({resultCode: 1});
    })
})

server.listen(port, () => {
    console.log('Example port ' + port);
})