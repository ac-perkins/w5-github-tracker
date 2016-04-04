(function(ght) {
  'use strict';

ght.ghToken = '';
ght.ghUser = {};

$('#login-form').submit(function (event) {
    event.preventDefault();
    ght.GHToken = $('#login-field').val();
    console.log('login submit works');
    console.log(ght.GHToken);


  $.ajax({
      type: 'GET',
      url: 'https://api.github.com/user',
      dataType: 'json',
      headers: {
          Authorization: 'token ' + ght.ghToken
      },
      success: function getGHUserData(data) {
        console.log( data );

      },
      error: function handleErrors(xhr) {
        console.log( xhr );
      },

    });

});



  window.ght = ght;

})(window.ght || {});
