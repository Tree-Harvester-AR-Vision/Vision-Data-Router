const WebSocket = require('ws')

const events = require('events')
const { networkInterfaces } = require('os');

const nets = networkInterfaces();
const results = Object.create(null);

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
        if (net.family === familyV4Value && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            console.log(net.address);
        }
    }
}

var port = process.env.PORT || 7000

var eventEmitter = new events.EventEmitter()

var BoundingBoxes

var counter = 0

//Websocket (TCP)

const wss = new WebSocket.Server({ port: port }, () => {
    console.log(`===> Server Started on port ${port}`)
})

wss.on('connection', function connection(ws) {
    let ts = Date.now();
    console.log(ts + ": Connection!")
    ws.on('message', (data) => {
        if (data == 'T') {
            ws.on('message', (boxData) => {
                BoundingBoxes = boxData
                eventEmitter.emit('New Box Data')
                counter++

                let ts = Date.now();
                console.log(ts + ": " + counter + ` Received "T" data`)
            })
        } else if (data == 'R') {
            let eventHandler = function() {
                ws.send(BoundingBoxes)
                counter++
                let ts = Date.now();
                console.log(ts + ": " + counter + ` Received "R" data`)
            }
            eventEmitter.on('New Box Data', eventHandler)
        }
    })
})

wss.on('listening', function () {
    console.log(`Listening on port ${port}`)
})

