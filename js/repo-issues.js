(function(ght) {
  'use strict';

    ght['repo-issues'] = {};

    ght['repo-issues'].load = function loadProfile(repo) {

        $.ajax({
            type: 'GET',
            url: 'https://api.github.com/repos/' + ght.ghUser.userName + '/' + repo + '/' + 'issues',
            dataType: 'json',
            headers: {
                Authorization: 'token ' + ght.ghToken
            },
            success: function getGHRepoIssues(data) {
                console.log(data);

                $('.repo-issues').empty();
                $('#issues').remove();
                appendRepoIssuesNav(repo);
                appendIssues(data, repo);
            },
            error: function handleErrors(xhr) {
              console.log( xhr );
            },
          });
    };

    function appendRepoIssuesNav(repo) {
      console.log();
        $('.repo-issues').addClass('active')
                .append( $('<a>').attr( {href: '#repo-issues_' + repo} ).text('Repo Issues') );
    }


    function appendIssues(data, repo) {
        $('main')
            .append( $('<section>').attr( {id: 'issues', class: 'view'} )
                .append( $('<a>').attr( {href: 'https://github.com/' + ght.ghUser.userName + '/' + repo + '/issues/', target: '_blank'} ).text(repo) )
                .append( $('<a>').attr( {id: 'new-issue-btn', class: 'btn btn-default', role: 'button', href: '#new-issue_' + repo} ).text('New Issue') )
                .append( $('<table>').attr( {class: 'table table-striped table-bordered'} )
                    .append( $('<thead>')
                        .append( $('<tr>')
                            .append( $('<th>').text('Issue Title') )
                            .append( $('<th>').text('Submitter') )
                            .append( $('<th>').text('Close?') )
                        )
                    )
                    .append( $('<tbody>').attr( {id: 'issues-tbody'} ) )
                )
            );

        data.forEach(function(element) {
          $('#issues-tbody')
              .append( $('<tr>')
                  .append( $('<td>')
                      .append( $('<a>').attr( {href: element.html_url, target: '_blank'} ).text(element.title) )
                  )
                  .append( $('<td>').text(element.user.login) )
                  .append( $('<td>')
                      .append( $('<input>').attr( {class: 'btn btn-default', type: 'button', value: 'Close Issue'} ) )
                  )
              );
        });
    }


window.ght = ght;

})(window.ght || {});
