var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.engine('html', require('ejs').renderFile);

app.use('/', express.static(__dirname + '/public'));

app.set('view engine', 'html');
app.set('views', __dirname + '/public/view');

app.get('/', function(req, res){
  res.render('index');
});

io.on('connection', (socket) => {
  socket.on('newrectangle', function(coords) {
    console.log('new rectangle was drawn at '
      + coords.x
      + ', '
      + coords.y
    );
  })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
