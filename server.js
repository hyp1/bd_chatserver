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
    Userlist();
  });

  socket.on('message', function(msg){
    var d = new Date();
    var n = d.getTime();
    var message = {time:n,msg:msg};
    
    io.sockets.emit('message', message);     
  });

  socket.on('private message', function(msg){
    console.log(msg);
    var d = new Date();
    var n = d.getTime();
    fromMsg = {from:userName, txt:msg.txt,time:n,tag:'*'}
   // no client clients[NAME]);
    if(clients[msg.to]!=undefined)clients[msg.to].emit('private message', fromMsg);
    else    console.log("no recipient");
    console.log(fromMsg);
  });

  socket.on('disconnect', function(){
    var d = new Date();
    var n = d.getTime();
    var message = {time:n,msg:userName+ " has disconnected."};
    console.log('disconnected '+userName);
    io.sockets.emit('message',  message);
    delete clients[userName];

  });

 
}); //userName !!!

function Userlist(){
    var users=[]
    for (var k in clients){
        if (clients.hasOwnProperty(k)) {
       users.push({id:1,name:k});
//             console.log("name is " + k + ", ip is" + clients[k].handshake.address);
        }
    }
    io.sockets.emit('userlist', users );
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