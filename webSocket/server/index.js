const port = process.env.port || 8000;
const express = require('express');
const socket = require('socket.io');
const {resolve} = require('path');
const bodyParser = require("body-parser");

const app = express();
const httpServer = require('http').createServer(app);
const io = socket(httpServer, { cors: { origin: "*" } });

module.exports = io;

app.use(bodyParser.json());
app.use('/api', require('./serverApi'));
app.use(express.static(resolve(__dirname, '..', 'client', 'build')));

app.get(/.*/, (req, res) => {
   res.sendFile(resolve(__dirname, '..', 'client', 'build', 'index.html'));
});

httpServer.listen(port, () => {
    console.log('Example port ' + port);
})

