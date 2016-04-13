(function(ght) {
  'use strict';

    ght.repos = {};

    ght.repos.load = function loadRepos() {

        $('#repos-tbody').empty();

        $.ajax({
            type: 'GET',
            url: 'https://api.github.com/users/' + ght.ghUser.userName + '/repos',
            dataType: 'json',
            headers: {
                Authorization: 'token ' + ght.ghToken
            },
            success: function getGHRepoData(repoData) {

                $('.repo-issues').empty();
                $('#issues').remove();
                $('.new-issue').empty();
                $('#newIssue').remove();
                ght._appendRepos(repoData);
            },
            error: function handleErrors(xhr) {
              console.log(xhr);
            },
          });
    };

        ght._appendRepos = function appendRepos(data) {
          if(data === undefined) {
            data = [ {name: 'undefined', stargazers_count: 'undefined', open_issues: 'undefined'} ];
          }

          data.forEach( function(data) {
            $('#repos-tbody')
                .append( $('<tr>')
                    .append( $('<td>')
                        .append( $('<a>').attr( {href: '#repo-detail_' + data.name} ).text(data.name) )
                    )
                    .append( $('<td>').text(data.stargazers_count) )
                    .append( $('<td>').text(data.open_issues) )
                );
          });
        };


  window.ght = ght;

})(window.ght || {});
