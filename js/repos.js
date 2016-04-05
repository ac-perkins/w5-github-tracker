(function(ght) {
  'use strict';


  ght.repos = {};

  ght.repos.load = function loadRepos() {
      // Do an ajax call to get article data

      $.ajax({
          type: 'GET',
          url: 'https://api.github.com/user/repos',
          dataType: 'json',
          context: this,
          headers: {
              Authorization: 'token ' + ght.ghToken
          },
          success: function getGHRepoData(data) {
            console.log(data);


            $('#login').hide();

            // var nextView = $(this).attr('action');
            //
            // // maybe... if the Ajax call is succesful...
            // // $.ajax({
            // //   ...
            // //   success: function dataSuccess(data) {
            // //     // in here... go to nextView
            // //   }
            // // });
            //
            // window.location.hash = nextView;

            // ght.appendProfile();
          },
          error: function handleErrors(xhr) {
            console.log( xhr );
          },
        });

      console.log('loading repos');

      // ght.appendProfile();
  };


// });



  window.ght = ght;

})(window.ght || {});
