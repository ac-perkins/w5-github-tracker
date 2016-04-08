(function(ght) {
  'use strict';

    var repoIssues = [];
    ght['repo-issues'] = {};

    ght['repo-issues'].load = function loadProfile(repo) {



        console.log("Loading Repo Issues");

        $.ajax({
            type: 'GET',
            url: 'https://api.github.com/repos/' + ght.ghUser.userName + '/' + repo + '/' + 'issues',
            dataType: 'json',
            headers: {
                Authorization: 'token ' + ght.ghToken
            },
            success: function getGHRepoIssues(data) {
                console.log(data);

                data.forEach(function(element) {
                    repoIssues.push({
                      issue_url: element.html_url,
                      title: element.title,
                      repo_url: element.repository_url,
                      body: element.body,
                      submitter: element.user.login,
                    });
                });
                appendRepoIssuesNav(repo);
                appendIssues();
            },
            error: function handleErrors(xhr) {
              console.log( xhr );
            },
          });




    };

    function appendRepoIssuesNav(repo) {
        $('#navbar')
            .append( $('<li>').attr( {id: repo} )
                .append( $('<a>').attr( {href: '#repo-issues_' + repo} ).text('Repo Issues') )
            );
    }



    function appendIssues() {
        console.log('appendIssues executing');

        $('main')
            .append( $('<section>').attr( {id: 'issues', class: 'view'} )
                .append( $('<a>').attr( {href: 'https://github.com/' + ght.ghUser.userName + '/' + ght.singleRepoInfo.name + '/issues/', target: '_blank'} ).text(ght.singleRepoInfo.name) )
                .append( $('<a>').attr( {class: 'btn btn-default', role: 'button', href: '#new-issue_' + ght.singleRepoInfo.name} ).text('New Issue') )
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

      repoIssues.forEach(function(element) {

        $('#issues-tbody')
            .append( $('<tr>')
                .append( $('<td>')
                    .append( $('<a>').attr( {href: element.issue_url, target: '_blank'} ).text(element.title) )
                )
                .append( $('<td>').text(element.submitter) )
                .append( $('<td>')
                    .append( $('<input>').attr( {class: 'btn btn-default', type: 'button', value: 'Close Issue'} ) )
                )
            );
      });
    }





window.ght = ght;

})(window.ght || {});
