'use strict';

(function($){
  $(function(){

    var $form = $('form');
    var $registerButton = $('.btn-register');
    var $loader = $('.preloader-wrapper');
    var $alertBox = $('.alert');
    var $alertText = $('.alert span');
    var $name = $('#name');
    var $email = $('#email');
    var $password = $('#password');
    var $repeat = $('#repeat');


    $registerButton.on('click', attemptRegister);

    function attemptRegister(e){
      e.preventDefault();

      if(!$name.val().length){
        $alertText.html('Please write your name');
        $alertBox.show();
        $name.focus();
        $name.select();
        return;
      }

      if(!$email.val().length){
        $alertText.html('Please write your email');
        $alertBox.show();
        $email.focus();
        $email.select();
        return;
      }

      if($email.hasClass('invalid')){
        $email.focus();
        $email.select();
        return;
      }

      if($password.val() != $repeat.val()){
        $alertText.html('The passwords don\'t match');
        $alertBox.show();
        $repeat.focus();
        $repeat.select();
        return;
      };

      if($password.val().length < 6){
        $alertText.html('The password is too short. Please use at least 6 characters.');
        $alertBox.show();
        $password.focus();
        $password.select();
        return;
      };

      $alertBox.hide();
      $registerButton.hide();
      $loader.show();

      var userData = $form.serialize();

      $.ajax({
        type: 'POST', url: '/register', data: userData
      })
      .fail(function(jqXHR, description) {
        $alertText.html(description);
        $alertBox.show();
      })
      .done(function(response){
        if(response.result == 'ok'){
          window.location = '/dashboard';
        } else if (response.error) {
          $alertText.html(response.error);
          $alertBox.show();
        } else {
          $alertText.html('Unknown error. Please try again later.');
          $alertBox.show();
        }
      })
      .always(function(){
        $registerButton.show();
        $loader.hide();
      });
    }

  });
})(jQuery);
