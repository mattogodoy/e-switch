'use strict';

(function($){
  $(function(){

    var $form = $('form');
    var $loginButton = $('.btn-login');
    var $loader = $('.preloader-wrapper');
    var $alertBox = $('.alert');
    var $alertText = $('.alert span');
    var $email = $('#email');


    $loginButton.on('click', attemptLogin);

    function attemptLogin(e){
      e.preventDefault();

      if($email.hasClass('invalid')){
        $email.focus();
        $email.select();
        return;
      }

      $alertBox.hide();
      $loginButton.hide();
      $loader.show();

      var userData = $form.serialize();

      $.ajax({
        type: 'POST', url: '/login', data: userData
      })
      .fail(function(jqXHR, description) {
        $alertText.html(description);
        $alertBox.show();
      })
      .done(function(response){
        if(response.result == 'ok'){
          console.log("yesss!!");
        } else if (response.error) {
          $alertText.html(response.error);
          $alertBox.show();
        } else {
          console.log('Error:', response);
          $alertText.html('Unknown error. Please try again later.');
          $alertBox.show();
        }
      })
      .always(function(){
        $loginButton.show();
        $loader.hide();
      });
    }

  });
})(jQuery);
