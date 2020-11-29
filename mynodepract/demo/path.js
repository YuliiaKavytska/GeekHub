const path = require('path')

console.log('name of file: ', path.basename(__filename))
// name of file:  path.js
console.log('name of directory: ', path.dirname(__filename))
// name of directory:  /home/alex/Рабочий стол/geek/GeekHub/mynodepract/demo
console.log('extension of file: ', path.extname(__filename))
// widening of file:  .js
console.log('parse: ', path.parse(__filename))
// parse:  {
//     root: '/',
//         dir: '/home/alex/Рабочий стол/geek/GeekHub/mynodepract/demo',
//         base: 'path.js',
//         ext: '.js',
//         name: 'path'
// }
console.log('parse: ', path.parse(__filename).name)
// работа с путями. формируем путь. модуль пас джоин, название директории в которой работаем, хотим перейти в папку сервер и получить доступ к индексу
console.log(path.join(__dirname, 'server', 'index.html'))
// /home/alex/Рабочий стол/geek/GeekHub/mynodepract/demo/server/index.html