var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';


var http = require('http').Server(app);
var io = require('socket.io')(http);



var clients = {};
logs=[];

io.sockets.on('connection', function (socket) {
    var userName;
  socket.on('connection name',function(user){
    console.log('ip:'+socket.handshake.address);
    userName = user.name;
    clients[user.name] = socket;
    console.log('clients['+user.name+']');
    io.sockets.emit('new user', user.name + " has joined.");
  });

  socket.on('message', function(msg){
    io.sockets.emit('message', msg);
    console.log(clients.length,'clients');
    addUserlist();
  });

  socket.on('private message', function(msg){
    console.log(msg);
    fromMsg = {from:userName, txt:msg.txt}
   // no client clients[NAME]);
    if(clients[msg.to]!=undefined)clients[msg.to].emit('private message', fromMsg);
    else    console.log("no recipient");
  });

  socket.on('disconnect', function(){
    console.log('disconnected '+userName);
    delete clients[userName];
  });

 
}); //userName !!!

function addUserlist(){
    for (var k in clients){
        if (clients.hasOwnProperty(k)) {
            var u
            io.sockets.emit('userlist', k + " has joined.");
             console.log("Key is " + k + ", value is" + clients[k].handshake.address);
        }
    }
     
}


function addLog(cmd,msg){

     
}

http.listen(port, function(){
  console.log('listening on *:' + port);
});


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
 
app.get('/chat.html', function(req, res){
    res.sendFile(__dirname + '/chat.html');
});

module.exports = app ;