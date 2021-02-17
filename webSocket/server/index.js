const port = process.env.port || 8000;
const express = require('express');
const socket = require('socket.io');
const {resolve} = require('path');
const bodyParser = require("body-parser"); // парсим данные чтобы в боди приходили данные а не пустой объект. это посредник (мидллваре)
const fs = require('fs/promises');

const app = express(); // создаем експресс приложение
const httpServer = require('http').createServer(app);// создаем сервер. вся логика будет работать через приложение експресса
const io = socket(httpServer, { cors: { origin: "*" } }); // подключаем сокеты к нашему серверу. и теперь наш сервер знает что такое сокеты и может их использовать

app.use(bodyParser.json());
app.use('/api', require('./serverApi')); // подключаем дополнительный уровень для роутов (апи)
app.use(express.static(resolve(__dirname, '..', 'client', 'build'))); // статические файлы
// по всем урлам возвращать статику
app.get(/.*/, (req, res) => {
   res.sendFile(resolve(__dirname, '..', 'client', 'build', 'index.html'));
});

// проверяем есть ли подключение к сокетам. и получаем при подключении уникальную переменную сокет (с уникальным айди)
io.on('connection', socket => {
    // запрос на изменение.
    socket.on('newTodo:change', ({task}) => {
        fs.readFile(resolve(__dirname, 'todo.json'))
            .then(readData => {
                let todoObj = JSON.parse(readData);
                todoObj['lastTask'] = task;
                todoObj = JSON.stringify(todoObj);
                return fs.writeFile(resolve(__dirname, 'todo.json'), todoObj);
            })
            .then(() => {
                // уведомляем всех о изменениях
                io.emit('newTodo:wasChanged', {success: true, task})
            })
            .catch(err => {
                io.emit('newTodo:wasChanged', {success: false, message: err.message})
            })
    });

    socket.on('newTodo:add', lastTask => {
        fs.readFile(resolve(__dirname, 'todo.json'))
            .then(readData => {
                let todoObj = JSON.parse(readData);

                const id = todoObj.list.length > 0 ? todoObj.list[todoObj.list.length - 1].id + 1 : 1
                todoObj.list.push({id, task: lastTask, status: "active", editing: false});
                todoObj['lastTask'] = '';

                todoObj = JSON.stringify(todoObj);
                return fs.writeFile(resolve(__dirname, 'todo.json'), todoObj);
            })
            .then(() => io.emit('newTodo:wasAdded', {success: true, task: lastTask}))
            .catch(err => io.emit('newTodo:wasAdded', {success: false, message: err.message}));
    });

    socket.on('all:complete', () => {
        fs.readFile(resolve(__dirname, 'todo.json'))
            .then(readData => {
                let todoObj = JSON.parse(readData);

                todoObj['list'] = todoObj.list.some(elem => elem.status === 'active')
                    ? todoObj.list.map(element => ({...element, status: "completed"}))
                    : todoObj.list.map(element => ({...element, status: "active"}));

                todoObj = JSON.stringify(todoObj);
                return fs.writeFile(resolve(__dirname, 'todo.json'), todoObj);
            }).then(() => io.emit('all:wasCompleted', {success: true}))
            .catch(err => io.emit('all:wasCompleted', {success: false, message: err.message}));
    });

    socket.on('completed:delete', () => {
        fs.readFile(resolve(__dirname, 'todo.json'))
            .then(readData => {
                let todoObj = JSON.parse(readData);

                todoObj['list'] = todoObj.list.filter(e => e.status !== 'completed');

                todoObj = JSON.stringify(todoObj);
                return fs.writeFile(resolve(__dirname, 'todo.json'), todoObj);
            })
            .then(() => io.emit('completed:wasDeleted', {success: true}))
            .catch(err => io.emit('completed:wasDeleted', {success: false, message: err.message}));
    });

    socket.on('todo:delete', id => {
        fs.readFile(resolve(__dirname, 'todo.json'))
            .then(readData => {
                let todoObj = JSON.parse(readData)

                todoObj['list'] = todoObj.list.filter(el => el.id !== id);

                todoObj = JSON.stringify(todoObj);
                return fs.writeFile(resolve(__dirname, 'todo.json'), todoObj);
            })
            .then(() => io.emit('todo:wasDeleted', {id, success: true}))
            .catch(err => io.emit('todo:wasDeleted', {success: false, message: err.message}));
    });

    socket.on('todoStatus:change', id => {
        fs.readFile(resolve(__dirname, 'todo.json'))
            .then(readData => {
                let todoObj = JSON.parse(readData);

                todoObj['list'] = todoObj.list.map(element => element.id === id
                    ? {...element, status: element.status === "completed" ? "active" : 'completed'}
                    : element);

                todoObj = JSON.stringify(todoObj);
                return fs.writeFile(resolve(__dirname, 'todo.json'), todoObj);
            })
            .then(() => io.emit('todoStatus:wasChanged', {id, success: true}))
            .catch(err => io.emit('todoStatus:wasChanged', {success: false, message: err.message}));
    });

    socket.on('todo:change', ({id, task}) => {
        fs.readFile(resolve(__dirname, 'todo.json'))
            .then(readData => {
                let todoObj = JSON.parse(readData);

                todoObj['list'] = todoObj.list.map(
                    element => element.id === id
                        ? { ...element, task }
                        : element)

                todoObj = JSON.stringify(todoObj);
                return fs.writeFile(resolve(__dirname, 'todo.json'), todoObj);
            })
            .then(() => io.emit('todo:wasChanged', {success: true, id, task}))
            .catch(err => io.emit('todo:wasChanged', {success: false, message: err.message}));
    });

    console.log('connected user with id: ' + socket.id)
});

// слушаем порт
httpServer.listen(port, () => {
    console.log('Example port ' + port);
})

