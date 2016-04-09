(function(ght) {
  'use strict';

    ght['new-issue'] = {};

    ght['new-issue'].load = function loadProfile(repo) {

        $('.new-issue').empty();
        $('#newIssue').remove();
        appendNewIssueNav(repo);
        appendNewIssueForm();

    };

    function appendNewIssueNav(repo) {
        $('.new-issue').addClass('active')
            // .append( $('<li>').attr( {id: repo} )
                .append( $('<a>').attr( {href: '#new-issue_' + repo} ).text('New Issue') );
            // );
    }

    function appendNewIssueForm() {

      $('main')
          .append( $('<section>').attr( {id: 'newIssue', class: 'view'} )
              .append( $('<a>').attr( {href: 'https://github.com/' + ght.ghUser.userName + '/' + ght.singleRepoInfo.name + '/issues/', target: '_blank'} ).text(ght.singleRepoInfo.name) )
              .append( $('<form>').attr( {id: 'issue-submit', action: '#repo-issues_' + ght.singleRepoInfo.name} )
                  .append( $('<input>').attr( {id: 'issue-title', class: 'form-control', type: 'text', name: 'issue-title', placeholder: 'Issue title...'} ) )
                  .append( $('<textarea>').attr( {id: 'issue-body', class: 'form-control', type: 'text', name: 'issue-body', placeholder: 'This is the content of my issue...'} ) )
                  .append( $('<input>').attr( {id: 'cancel-btn', class: 'btn btn-default', type:'button', action: '#repo-issues_' + ght.singleRepoInfo.name, value:'Cancel'}) )
                  .append( $('<input>').attr( {class: 'btn btn-default', type:'submit', value:'Submit'}) )
              )
          );

    }


    $('main').on('click', '#cancel-btn', function( event ) {
        event.preventDefault();
        window.location.hash = $(this).attr('action');

    });


    $('main').on('submit', '#issue-submit', function( event ) {
        event.preventDefault();
        var formValue = {};
        formValue.title =  $('#issue-title').val();
        formValue.body = $('#issue-body').val();
        // console.log( $(this).serialize() );
        console.log(formValue);
        // createNewIssue(formValue.title, formValue.body);

        $.ajax({
          type: 'POST',
          url: 'https://api.github.com/repos/' + ght.ghUser.userName + '/' + ght.singleRepoInfo.name + '/issues',
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
            // adv.displayCreateStory();
            window.location.hash = $(this).attr('action');
          },
          error: function handleErrors(xhr) {
            console.log( xhr );
            $('#login-error').css('display', 'block');
          },
        });

    });


    // function createNewIssue(formTitle, formBody) {
      // $.ajax({
      //   type: 'POST',
      //   url: 'https://api.github.com/repos/' + ght.ghUser.userName + '/' + ght.singleRepoInfo.name + '/issues',
      //   contentType: 'application/json',
      //   dataType: 'json',
      //   context: this,
      //   headers: {
      //       Authorization: 'token ' + ght.ghToken
      //   },
      //   data: JSON.stringify(
      //     {title: formTitle, body: formBody}
      //   ),
      //   success: function getToken(data) {
      //     console.log(data);
      //     // adv.displayCreateStory();
      //     window.location.hash = $(this).attr('action');
      //   },
      //   error: function handleErrors(xhr) {
      //     console.log( xhr );
      //     $('#login-error').css('display', 'block');
      //   },
      // });
    // }


    window.ght = ght;

})(window.ght || {});
