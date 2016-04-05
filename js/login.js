(function(ght) {
  'use strict';

ght.ghToken = null;
ght.ghUser = {};

window.addEventListener('hashchange', function hashNav() {
        doNav();
    });

$('#login-form').submit(function (event) {
    event.preventDefault();
    ght.ghToken = $('#login-field').val();
    // console.log('login submit works');
    console.log(ght.ghToken);

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

        var nextView = $(this).attr('action');

        // maybe... if the Ajax call is succesful...
        // $.ajax({
        //   ...
        //   success: function dataSuccess(data) {
        //     // in here... go to nextView
        //   }
        // });

        window.location.hash = nextView;

        ght.appendProfile();
      },
      error: function handleErrors(xhr) {
        console.log( xhr );
      },
    });
});


function doNav() {
        // $('.view').hide();
        var newView = $( window.location.hash ).show();

        // $('nav li').removeClass('active');

        // $('nav a[href="' + window.location.hash + '"]').closest('li').addClass('active');

        if (newView.length === 0) {
            // if they try to load a bad view, default to login!
            console.log('is it here?');
            window.location.hash = '#login';
        } else {
            // do stuff the view needs

            console.log('or is it here?');

            var viewName = window.location.hash.substr(1);
            console.log(viewName);

            if (ght[viewName] && ght[viewName].load) {
                // ns['view-1'].load();
                ght[viewName].load();
            }
        }
    }


    // navigate to a view when the page loads
    ght.init = function() {
        doNav();
    };


  window.ght = ght;

})(window.ght || {});
