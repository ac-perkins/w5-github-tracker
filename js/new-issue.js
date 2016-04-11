(function(ght) {
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
