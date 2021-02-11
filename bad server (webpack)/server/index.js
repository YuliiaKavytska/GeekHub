const express = require('express');
const server = express();
const port = 8000;
const {resolve} = require('path');
const fs = require('fs/promises');

// Serve the static files from the React app
// server.use(express.static(resolve(__dirname, '..', 'client/dist')));

server.get('/all', (req, res) => {
    if (req.xhr) {
        fs.readFile(resolve(__dirname, 'todo.json')).then(response => {
            const list = JSON.parse(response.toString());
            console.log(response);
            console.log(list)
            res.send(list);
        })
    }

});

server.listen(port, () => {
    console.log('Example port 8000');
})