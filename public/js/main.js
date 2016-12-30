'use strict';

$(function(){
  var client = mqtt.connect('ws://test.mosquitto.org:8080/mqtt');
  var $switch = $('.switch');
  var switchTopic = 'devices/twon-two/light/on';
  var switchIsOn = false;

  client.on('connect', function(){
    console.log('--->');
    
    client.subscribe('devices/#', function(){
      console.log('===>');
    });
    
    client.on('message', function (topic, payload) {
      console.log([topic, payload].join(": "));

      if(topic = switchTopic){
        if(payload == 'true'){
          $switch.removeClass('off').addClass('on');
          switchIsOn = true;
        } else {
          $switch.removeClass('on').addClass('off');
          switchIsOn = false;
        }
      }
    })
  });

  $switch.on('click', toggleSwitch);

  function toggleSwitch(){
    if(client.connected){
      client.publish(switchTopic + '/set', (!switchIsOn).toString());
    }
  }
});