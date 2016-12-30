var express = require('express');
var app = express();
var port = 8000;
var mqttLib = require('mqtt');
var mqtt  = mqttLib.connect('mqtt://test.mosquitto.org');

app.use(express.static('public'));

app.get('/test', function(req, res){
  res.json('hola!');
});

mqtt.on('connect', function () {
  mqtt.subscribe('devices/#', function(err, granted){
    if(!err){
      console.log('Subscribed!', JSON.stringify(granted));
      mqtt.publish('devices', 'Hello mqtt');
    } else {
      console.log('Error while subscribing!', JSON.stringify(err));
    }
  });
  // mqtt.publish('presence', 'Hello mqtt');
});

mqtt.on('message', function (topic, message) {
  // message is Buffer
  console.log(topic.toString(), message.toString());
});

app.listen(port, function(){
  console.log('Listening on port', port);
});