var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';


var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

});

http.listen(port, function(){
  console.log('listening on *:' + port);
});


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
 
module.exports = app ;