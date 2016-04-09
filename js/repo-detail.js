(function(ght) {
  'use strict';

    ght['repo-detail'] = {};

    ght['repo-detail'].load = function loadProfile(repo) {   //// Get repo to equal 2nd part of hashsplit

        // ght.repoHashSplit = window.location.hash.substr(6);
        // console.log(ght.repoHashSplit);
        // $('#navbar').find('li#' + repo).remove();


            // ght._appendRepoDetailNav(repo);



        console.log('how many?');

        ght.singleRepoInfo = {};

        $.ajax({
            type: 'GET',
            url: 'https://api.github.com/repos/' + ght.ghUser.userName + '/' + repo,
            dataType: 'json',
            headers: {
                Authorization: 'token ' + ght.ghToken
            },
            success: function getGHRepoDetails(data) {
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

                    $('.repo-detail').empty();
                    $('#repoDetail').remove();
                    $('.repo-issues').empty();
                    $('#issues').remove();
                    $('.new-issue').empty();
                    $('#newIssue').remove();
                    ght._appendRepoDetailNav(repo);

                    appendSingleRepoDetail(
                        ght.singleRepoInfo.url,
                        ght.singleRepoInfo.name,
                        ght.singleRepoInfo.description,
                        ght.singleRepoInfo.issues,
                        ght.ghUser.userName,
                        ght.singleRepoInfo.stars,
                        ght.singleRepoInfo.forks,
                        ght.singleRepoInfo.created
                    );
            },
            error: function handleErrors(xhr) {
              console.log( xhr );
            },
          });

    };

    ght._appendRepoDetailNav = function appendRepoDetailNav(repo) {
        $('.repo-detail').addClass('active')
            // .append( $('<li>').attr( {id: repo, class: 'repo_detail'} )
                .append( $('<a>').attr( {href: '#repo-detail_' + repo} ).text('Repo Detail') );
            // );
    };

    function appendSingleRepoDetail(url, name, description, issues, userName, stars, forks, created) {
        $('main')
            .append( $('<section>').attr( {id: 'repoDetail', class: 'view'} )
                .append( $('<ul>')
                    .append( $('<li>')
                        .append( $('<a>').attr( {href: url, target: '_blank'} ).text(name) )
                    )
                    .append( $('<li>').text(description) )
                    .append( $('<li>')
                        .append( $('<a>').attr( {href: '#repo-issues_' + name} ).text(issues + ' open issues') )
                    )
                    .append( $('<li>').text('Owner: ' + userName) )
                    .append( $('<li>').text('Star: ' + stars) )
                    .append( $('<li>').text('Forks ' + forks) )
                    .append( $('<li>').text('Created on: ' + created.substr(0, 10)) )
                )
            );

    }


    window.ght = ght;

})(window.ght || {});
