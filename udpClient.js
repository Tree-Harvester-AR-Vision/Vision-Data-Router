const dgram = require('node:dgram');
var buffer = require('buffer');

const message = Buffer.from('heartbeat');
const client = dgram.createSocket('udp4');
const interval = setInterval(function() {
    client.send(message,7000,'192.168.167.150',function(error){
        if(error){
          client.close();
        }else{
          console.log('Data sent!');
        }
      });      
}, 50);