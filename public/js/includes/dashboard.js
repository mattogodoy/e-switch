'use strict';

(function($){

  $(function(){
    var client = mqtt.connect('ws://test.mosquitto.org:8080/mqtt');
    var $switch = $('.device1 input');
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
            $switch.prop('checked', true);
            switchIsOn = true;
          } else {
            $switch.prop('checked', false);
            switchIsOn = false;
          }
        }
      })
    });

    $switch.on('click', toggleSwitch);

    function toggleSwitch(e){
      e.preventDefault();

      if(client.connected){
        client.publish(switchTopic + '/set', (!switchIsOn).toString());
      }
    }

  });

})(jQuery);
