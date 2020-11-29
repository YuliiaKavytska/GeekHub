// const chalk = require('chalk') // абсолютный путь к файлу
// // link our own module. относительный путь пишем ./
// const text = require('./data')
// // получаем переменную с другого файла
// console.log(chalk.blue(text))
// console.log(__dirname)
// console.log(__filename)


const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((request, responce) => {

    console.log(request.url)

    if (request.url === '/') {
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
            if (err) {
                throw err
            }
            responce.writeHead(200, {
                'Content-Type': 'text/html'
            })
            responce.end(data)
        })
    } else if (request.url === '/contact') {
        fs.readFile(path.join(__dirname, 'public', 'contact.html'), (err, data) => {
            if (err) {
                throw err
            }
            responce.writeHead(200, {
                'Content-Type': 'text/html'
            })
            responce.end(data)
        })
    }
})

server.listen(3000, () => {
    console.log('Server has been started...')
})