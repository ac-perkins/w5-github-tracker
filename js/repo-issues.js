(function(ght) {
  'use strict';

    ght['repo-issues'] = {};

    ght['repo-issues'].load = function loadProfile(repo) {

        console.log("Loading Repo Issues");
        appendRepoIssuesNav();
    };

    function appendRepoIssuesNav(repo) {
        $('#navbar')
            .append( $('<li>').attr( {id: repo} )
                .append( $('<a>').attr( {href: '#repo-detail_' + repo} ).text('Repo Issues') )
            );
    }



    function appendIssues() {
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
