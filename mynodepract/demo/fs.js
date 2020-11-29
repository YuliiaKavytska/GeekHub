const fs = require('fs')
// file system. acept to work with directories
// dont use mkdirSync. this is asunc method
const path = require('path')
// создать папку. первый параментр мы указываем путь где ее создать. и название папки второй параметр это ошибка. коллбек.
// fs.mkdir(path.join(__dirname, 'test'), (err) => {
//     // если есть ошибка то выкинуть ее
//     if (err) {
//         throw err
//     }
//     console.log('Dir is created')
// })

// создает файл но перезаписывает всю существующую инфу и файл
const filePath = path.join(__dirname, 'test', 'text.txt')
// fs.writeFile(filePath, 'Hello new file!', (err) => {
//     if (err) {
//         throw err
//     }
//     console.log('file was created')
//
//     fs.appendFile(filePath, '\nHello new file 2!', (err) => {
//         if (err) {
//             throw err
//         }
//         console.log('file was created 2')
//     })
// })

// READ OF FILES
// fs.readFile(filePath, (err, content) => {
//     if (err) {
//         throw err
//     }
//     console.log(content)
// //  <Buffer 48 65 6c 6c 6f 20 6e 65 77 20 66 69 6c 65 21 0a 48 65 6c 6c 6f 20 6e 65 77 20 66 69 6c 65 20 32 21>
//
// //  buffer into string
//     const data = Buffer.from(content)
//     console.log(data.toString())
// })

// second method buffer to string
fs.readFile(filePath, 'utf-8', (err, content) => {
    if (err) {
        throw err
    }
    console.log(content)
})