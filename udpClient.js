const dgram = require('node:dgram');
var buffer = require('buffer');

const message = Buffer.from('siddheshrane');
const client = dgram.createSocket('udp4');
const interval = setInterval(function() {
    client.send(message,41234,'localhost',function(error){
        if(error){
          client.close();
        }else{
          console.log('Data sent !!!');
        }
      });      
}, 500);