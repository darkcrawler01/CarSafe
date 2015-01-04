var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
  socket.on('warning', function(msg){
    io.emit('warning', msg);
    console.error("sent");
  });
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});

