var mqttLib = require('mqtt');
var mqtt  = mqttLib.connect('mqtt://test.mosquitto.org');

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

module.exports = mqtt;