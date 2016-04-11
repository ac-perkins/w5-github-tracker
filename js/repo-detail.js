(function(ght) {
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
