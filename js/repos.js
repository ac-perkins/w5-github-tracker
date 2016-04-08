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
                      .append( $('<a>').attr( {href: '#repo-detail_' + element.name} ).text(element.name) )
                  )
                  .append( $('<td>').text(element.stars) )
                  .append( $('<td>').text(element.open_issues) )
              );
        });
      }


  window.ght = ght;

})(window.ght || {});
