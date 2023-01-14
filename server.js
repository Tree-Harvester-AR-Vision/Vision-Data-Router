const WebSocket = require('ws')

var port = process.env.PORT || 8000

const wss = new WebSocket.Server({ port: port }, () => {
    console.log(`===> Server Started on port ${port}`)
})

wss.on('connection', function connection(ws) {
    ws.on('message', (data) => {
        console.log(`Recieved ${data} from client`)
    })
})

wss.on('listening', function () {
    console.log(`Listening on port ${port}`)
})