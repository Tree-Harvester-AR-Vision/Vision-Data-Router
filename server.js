const WebSocket = require('ws')
const events = require('events')

var port = process.env.PORT || 8000

var eventEmitter = new events.EventEmitter()

var BoundingBoxes

const wss = new WebSocket.Server({ port: port }, () => {
    console.log(`===> Server Started on port ${port}`)
})

wss.on('connection', function connection(ws) {
    console.log("connection!")
    ws.on('message', (data) => {
        console.log(`Data = ${data}`)
        if (data == 'T') {
            ws.on('message', (boxData) => {
                BoundingBoxes = boxData
                console.log(`Box = ${BoundingBoxes}`)
                eventEmitter.emit('New Box Data')
            })
        } else if (data == 'R') {
            let breakSig = false
            let eventHandler = function() {
                ws.send(BoundingBoxes)
            }
            
            eventEmitter.on('New Box Data', eventHandler)
        }
    })
})

wss.on('listening', function () {
    console.log(`Listening on port ${port}`)
})