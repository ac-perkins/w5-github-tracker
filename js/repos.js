(function(ght) {
  'use strict';


  ght.repos = {};

  ght.repos.load = function loadRepos() {

      $('#repos-tbody').empty();
      ght.reposInfo = [];

      $.ajax({
          type: 'GET',
          url: 'https://api.github.com/user/repos',
          dataType: 'json',
          headers: {
              Authorization: 'token ' + ght.ghToken
          },
          success: function getGHRepoData(data) {

            data.forEach(function(element) {
                ght.reposInfo.push({
                  repo_id: element.id,
                  name: element.name,
                  url: element.html_url,
                  stars: element.stargazers_count,
                  open_issues: element.open_issues,
                  issues_url: element.issues_url,
                  description: element.description,
                  forks: element.forks,
                  created: element.created_at
                });

            });
            console.log(ght.reposInfo);

            appendRepos();
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

  };


      function appendRepos() {
        console.log(ght.repos);
        ght.reposInfo.forEach(function(element) {
          $('#repos-tbody')
              .append( $('<tr>')
                  .append( $('<td>')
                      .append( $('<a>').attr( {href: '#repo_' + element.name} ).text(element.name) )
                  )
                  .append( $('<td>').text(element.stars) )
                  .append( $('<td>').text(element.open_issues) )
              );
        });
      }

      // $('#repos').on('click', '#repos-tbody a', function() {
      //     var repoHashSplit = $(this).attr('href').substr(6);
      //     console.log(repoHashSplit);
      //     ght.repoHashSplit = repoHashSplit;
      // });



  window.ght = ght;

})(window.ght || {});
