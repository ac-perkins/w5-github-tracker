(function(ght) {
  'use strict';

    ght.repoDetail = {};

    ght.repoDetail.load = function loadProfile(repo) {   //// Get repo to equal 2nd part of hashsplit

        ght.repoHashSplit = window.location.hash.substr(6);
        console.log(ght.repoHashSplit);

        appendRepoDetailNav();
        console.log('how many?');

        ght.singleRepoInfo = {};

        $.ajax({
            type: 'GET',
            url: 'https://api.github.com/repos/' + ght.ghUser.userName + '/' + ght.repoHashSplit,
            dataType: 'json',
            headers: {
                Authorization: 'token ' + ght.ghToken
            },
            success: function getGHRepoData(data) {
                console.log(data);

                    ght.singleRepoInfo.id = data.id;
                    ght.singleRepoInfo.name = data.name;
                    ght.singleRepoInfo.url = data.html_url;
                    ght.singleRepoInfo.stars = data.stargazers_count;
                    ght.singleRepoInfo.issues = data.open_issues;
                    ght.singleRepoInfo.issues_url = data.issues_url;
                    ght.singleRepoInfo.description = data.description;
                    ght.singleRepoInfo.forks = data.forks;
                    ght.singleRepoInfo.created = data.created_at;

                    appendSingleRepoDetail();
              console.log(ght.reposInfo);
            },
            error: function handleErrors(xhr) {
              console.log( xhr );
            },
          });

    };

    function appendRepoDetailNav() {
        $('#navbar')
            .append( $('<li>')
                .append( $('<a>').attr( {href: '#repo_' + ght.repoHashSplit} ).text('Repo Detail') )
            );
    }

    function appendSingleRepoDetail() {
        $('main')
            .append( $('<section>').attr( {id: 'repoDetail', class: 'view'} )
                .append( $('<ul>')
                    .append( $('<li>').text(ght.singleRepoInfo.name) )
                    .append( $('<li>').text(ght.singleRepoInfo.description) )
                    .append( $('<li>').text(ght.singleRepoInfo.issues) )
                    .append( $('<li>').text(ght.ghUser.userName) )
                    .append( $('<li>').text(ght.singleRepoInfo.stars) )
                    .append( $('<li>').text(ght.singleRepoInfo.forks) )
                    .append( $('<li>').text(ght.singleRepoInfo.created) )
                )
            );

    }


    window.ght = ght;

})(window.ght || {});
