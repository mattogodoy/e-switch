var express = require('express');
var app = express();
var port = 8000;
var routes = require('./routes/main');
var mqtt = require('./includes/mqtt');
var session = require('express-session');

app.set('views', __dirname + '/public/views');
app.set('view engine', 'pug');
app.set('trust proxy', 1);

app.use(express.static('public'));
app.use(session({
  secret: 'shhhh',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use('/', routes);

app.listen(port, function(){
  console.log('Listening on port', port);
});