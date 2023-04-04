const dgram = require('node:dgram');
const server = dgram.createSocket('udp4');

var port = process.env.PORT || 41234

server.on('error', (err) => {
  console.error(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
    let ts = Date.now();
  console.log(`${ts}: server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(port);