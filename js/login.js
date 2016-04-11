(function(ght) {
  'use strict';

    ght.ghToken = null;
    ght.ghUser = {};


    $('#login-form').submit(function (event) {
        event.preventDefault();
        ght.ghToken = $('#login-field').val();
        console.log(ght.ghToken);
        localStorage.setItem('token', ght.ghToken);

      $.ajax({
          type: 'GET',
          url: 'https://api.github.com/user',
          dataType: 'json',
          context: this,
          headers: {
              Authorization: 'token ' + ght.ghToken
          },
          success: function getGHUserData(data) {
            console.log(data);
            ght.ghUser.userName = data.login;
            ght.ghUser.name = data.name;
            ght.ghUser.repos = data.public_repos;
            ght.ghUser.followers = data.followers;
            ght.ghUser.following = data.following;
            ght.ghUser.created = data.created_at;
            ght.ghUser.avatar = data.avatar_url;
            ght.ghUser.url = data.html_url;

            console.log(ght.ghUser);

            $('#login').hide();

            window.location.hash = $(this).attr('action');

          },
          error: function handleErrors(xhr) {
            console.log(xhr);
            $('#login-container p').remove();
            $('#login-container')
                .append($('<p>').text('Please enter a valid GitHub token.'));
          },
        });
    });

    $('#logout').click( function() {
        ght.ghToken = null;
    });



  window.ght = ght;

})(window.ght || {});
