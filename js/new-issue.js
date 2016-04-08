(function(ght) {
  'use strict';

    ght['new-issue'] = {};

    ght['new-issue'].load = function loadProfile() {

        appendNewIssueForm();

    };


    function appendNewIssueForm() {

      $('main')
          .append( $('<section>').attr( {id: 'newIssue', class: 'view'} )
              .append( $('<a>').attr( {href: 'https://github.com/' + ght.ghUser.userName + '/' + ght.singleRepoInfo.name + '/issues/', target: '_blank'} ).text(ght.singleRepoInfo.name) )
              .append( $('<form>').attr( {id: 'issue-submit'} )
                  .append( $('<input>').attr( {id: 'issue-title', class: 'form-control', type: 'text', name: 'issue-title', placeholder: 'Issue title...'} ) )
                  .append( $('<textarea>').attr( {id: 'issue-body', class: 'form-control', type: 'text', name: 'issue-body', placeholder: 'This is the content of my issue...'} ) )
                  .append( $('<input>').attr( {class: 'btn btn-default', type:'submit', value:'Submit'}) )
              )
          );

    }


    $('main').on('submit', '#issue-submit', function( event ) {
        event.preventDefault();
        var formValue = {};
        formValue.title =  $('#issue-title').val();
        formValue.body = $('#issue-body').val();
        // console.log( $(this).serialize() );
        console.log(formValue);
        createNewIssue(formValue.title, formValue.body);
    });


    function createNewIssue(formTitle, formBody) {
      $.ajax({
        type: 'POST',
        url: 'https://api.github.com/repos/' + ght.ghUser.userName + '/' + ght.singleRepoInfo.name + '/issues',
        contentType: 'application/json',
        dataType: 'json',
        headers: {
            Authorization: 'token ' + ght.ghToken
        },
        data: JSON.stringify(
          {title: formTitle, body: formBody}
        ),
        success: function getToken(data) {
          console.log(data);
          // adv.displayCreateStory();
        },
        error: function handleErrors(xhr) {
          console.log( xhr );
          $('#login-error').css('display', 'block');
        },
      });
    }


    window.ght = ght;

})(window.ght || {});
