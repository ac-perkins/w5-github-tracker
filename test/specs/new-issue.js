(function() {
    'use strict';

    var assert = chai.assert;

    var fixtureHTML = $('#fixtures').html();

    ght.ghUser = {};
    ght.ghUser.userName = 'ac-perkins';

    suite('repo details', function() {

        setup(function() {
            $('#fixtures').html(fixtureHTML);
        });


      test('Appending New Issue form works with a string in argument', function() {

          assert.strictEqual( $('#newIssue').length, 0, 'no link to start' );
          window.ght._appendNewIssueForm('test');
          assert.ok( $('#newIssue').length > 0, 'element exists' );
          assert.strictEqual( $('form').attr('action'), '#repo-issues_test', 'action value is what is expected' );
      });

      test('Appending New Issue form works with undefined in argument', function() {

          assert.strictEqual( $('#newIssue').length, 0, 'no link to start' );
          window.ght._appendNewIssueForm(undefined);
          assert.ok( $('#newIssue').length > 0, 'element exists' );
          assert.strictEqual( $('form').attr('action'), '#repo-issues_undefined', 'action value is what is expected' );

      });


  });



})();
