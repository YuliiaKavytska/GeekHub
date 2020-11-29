const EventEmitter = require('events')

// const emitter = new EventEmitter()
// anything= click
// emitter.on('anything', data => {
//     console.log('ON: antyhing ', data)
// })
//
// emitter.emit('anything', {a: 1})
// // ON: antyhing  { a: 1 }
//
// setTimeout(() => {
//     emitter.emit('anything', {c: 4})
// }, 1000)

class Dispatcher extends EventEmitter {
    subscribe(eventName, callback) {
        console.log('subscribe')
        this.on(eventName, callback)
    }

    dispatch(eventNave, data) {
        console.log('dispatching')
        this.on(eventName, data)
    }
}

const dis = new Dispatcher()

dis.subscribe('aa', data => {
    console.log('ON aa', data)
})
dis.subscribe('aa', {aa: 22})