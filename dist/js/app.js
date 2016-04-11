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
;(function(ght) {
  'use strict';

    window.addEventListener('hashchange', function hashNav() {
          doNav();
      });

    function doNav() {

        $('.view').hide();
        $( window.location.hash ).show();

        $('nav li').removeClass('active');

        $('nav a[href="' + window.location.hash + '"]').closest('li').addClass('active');

        var hashSplit = window.location.hash.substr(1).split(/_(.*)?/);
        console.log(hashSplit);

        if (!ght.ghToken) {
            $('main').hide();
            window.location.hash = '#login';
        }
        else {
            $('main').show();
            var viewName = window.location.hash.substr(1);
            console.log(viewName);

            if (ght[hashSplit[0]] && ght[hashSplit[0]].load) {
                ght[hashSplit[0]].load(hashSplit[1]);
            }
        }
    }

      ght.init = function() {
          doNav();
      };

      window.ght = ght;

})(window.ght || {});
;(function(ght) {
  'use strict';

    ght['new-issue'] = {};
    var repoName;

    ght['new-issue'].load = function loadProfile(repo) {

        repoName = repo;
        $('.new-issue').empty();
        $('#newIssue').remove();
        appendNewIssueNav(repo);
        ght._appendNewIssueForm(repo);

    };

    function appendNewIssueNav(repo) {
        $('.new-issue').addClass('active')
                .append( $('<a>').attr( {href: '#new-issue_' + repo} ).text('New Issue') );
    }

    ght._appendNewIssueForm = function appendNewIssueForm(repo) {

      $('main')
          .append( $('<section>').attr( {id: 'newIssue', class: 'view'} )
              .append( $('<a>').attr( {href: 'https://github.com/' + ght.ghUser.userName + '/' + repo + '/issues/', target: '_blank'} ).text(repo) )
              .append( $('<form>').attr( {id: 'issue-submit', action: '#repo-issues_' + repo} )
                  .append( $('<input>').attr( {id: 'issue-title', class: 'form-control', type: 'text', name: 'issue-title', placeholder: 'Issue title...'} ) )
                  .append( $('<textarea>').attr( {id: 'issue-body', class: 'form-control', type: 'text', name: 'issue-body', placeholder: 'This is the content of my issue...'} ) )
                  .append( $('<input>').attr( {id: 'cancel-btn', class: 'btn btn-default', type:'button', action: '#repo-issues_' + repo, value:'Cancel'}) )
                  .append( $('<input>').attr( {id: 'submit-btn', class: 'btn btn-default', type:'submit', value:'Submit'}) )
              )
          );

    };


    $('main').on('click', '#cancel-btn', function( event ) {
        event.preventDefault();
        window.location.hash = $(this).attr('action');
    });


    $('main').on('submit', '#issue-submit', function( event ) {
        event.preventDefault();
        var formValue = {};
        formValue.title =  $('#issue-title').val();
        formValue.body = $('#issue-body').val();

        $.ajax({
          type: 'POST',
          url: 'https://api.github.com/repos/' + ght.ghUser.userName + '/' + repoName + '/issues',
          contentType: 'application/json',
          dataType: 'json',
          context: this,
          headers: {
              Authorization: 'token ' + ght.ghToken
          },
          data: JSON.stringify(
            {title: formValue.title, body: formValue.body}
          ),
          success: function getToken(data) {
            console.log(data);
            window.location.hash = $(this).attr('action');
          },
          error: function handleErrors(xhr) {
            console.log( xhr );
          },
        });
    });


    window.ght = ght;

})(window.ght || {});
;(function(ght) {
  'use strict';

    ght.profile = {};

    ght.profile.load = function loadProfile() {

        $('#profile ul').empty();
        appendProfile(
            ght.ghUser.url,
            ght.ghUser.userName,
            ght.ghUser.name,
            ght.ghUser.repos,
            ght.ghUser.followers,
            ght.ghUser.following,
            ght.ghUser.created,
            ght.ghUser.avatar
        );
    };


    function appendProfile(url, userName, name, repos, followers, following, created, avatar) {
        $('#profile ul')
            .append( $('<img>').attr( {src: avatar, class: 'avatar_img'} ) )
            .append( $('<li>').text('Username: ')
                .append( $('<a>').attr( {href: url, target: '_blank'} ).text(userName) )
            )
            .append( $('<li>').text('Name: ' + name) )
            .append( $('<li>').text('Repos: ' + repos) )
            .append( $('<li>').text('Followers: ' + followers + ' (following ' + following + ')') )
            .append( $('<li>').text('Account created: ' + created.substr(0, 10)) );
    }


  window.ght = ght;

})(window.ght || {});
;(function(ght) {
  'use strict';

    ght['repo-detail'] = {};

    ght['repo-detail'].load = function loadProfile(repo) {

        $.ajax({
            type: 'GET',
            url: 'https://api.github.com/repos/' + ght.ghUser.userName + '/' + repo,
            dataType: 'json',
            headers: {
                Authorization: 'token ' + ght.ghToken
            },
            success: function getGHRepoDetails(data) {
                $('.repo-detail').empty();
                $('#repoDetail').remove();
                ght._appendRepoDetailNav(repo);
                appendSingleRepoDetail(data);
            },
            error: function handleErrors(xhr) {
              console.log( xhr );
            },
          });
    };

    ght._appendRepoDetailNav = function appendRepoDetailNav(repo) {
        $('.repo-detail').addClass('active')
                .append( $('<a>').attr( {href: '#repo-detail_' + repo} ).text('Repo Detail') );
    };

    function appendSingleRepoDetail(data) {
        $('main')
            .append( $('<section>').attr( {id: 'repoDetail', class: 'view'} )
                .append( $('<ul>')
                    .append( $('<li>')
                        .append( $('<a>').attr( {href: data.html_url, target: '_blank'} ).text(data.name) )
                    )
                    .append( $('<li>').text(data.description) )
                    .append( $('<li>')
                        .append( $('<a>').attr( {href: '#repo-issues_' + data.name} ).text(data.open_issues + ' open issues') )
                    )
                    .append( $('<li>').text('Owner: ' + ght.ghUser.userName) )
                    .append( $('<li>').text('Stars: ' + data.stargazers_count) )
                    .append( $('<li>').text('Forks: ' + data.forks) )
                    .append( $('<li>').text('Created on: ' + data.created_at.substr(0, 10)) )
                )
            );
    }


    window.ght = ght;

})(window.ght || {});
;(function(ght) {
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
;(function(ght) {
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
            data = [];
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

//# sourceMappingURL=app.js.map