const express = require('express');
const server = express();
const port = process.env.port || 8000;
const {resolve} = require('path');
const bodyParser = require("body-parser");

server.use(bodyParser.json());

server.use(bodyParser.urlencoded({extended: true}));

// подключаем дополнительный уровень для роутов (апи)
server.use('/api', require('./serverApi'))
server.use('/', require('./helpMe'))

// статические файлы
server.use('/', express.static(resolve(__dirname, '..', 'client', 'build')));

// по всем урлам возвращать статику
server.get("/*", (req, res) => {
   res.sendFile(resolve(__dirname, '..', 'client', 'build', 'index.html'));
});

// слушаем порт
server.listen(port, () => {
    console.log('Example port ' + port);
})
