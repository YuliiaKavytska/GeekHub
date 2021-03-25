const express = require('express')
const server = express()
const port = process.env.port || 8000
const {resolve} = require('path')
const bodyParser = require('body-parser')

server.use(bodyParser.json())

server.use('/api', require('./serverApi'))

server.use(express.static(resolve(__dirname, 'public', 'uploads')));

server.listen(port, () => {
    console.log('Server is on at port: ' + port)
})


