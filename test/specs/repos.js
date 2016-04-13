(function() {
    'use strict';

    var assert = chai.assert;

    var fixtureHTML = $('#fixtures').html();

    var data = [
      {
        name: 'Repo-name1',
        stargazers_count: 3,
        open_issues: 7
      },
      {
        name: 'Repo-name2',
        stargazers_count: 75,
        open_issues: 48
      }
    ];

    suite('Appending repos', function() {

        setup(function() {
            $('#fixtures').html(fixtureHTML);
        });


      test('Appending Repos works with an object in its argument', function() {

          assert.strictEqual( $('#repos-tbody tr').length, 0, 'no link to start' );
          window.ght._appendRepos(data);
          assert.strictEqual( $('#repos-tbody tr').length, 2, 'correct number of table rows' );
          assert.strictEqual( $('#repos-tbody td').length, 6, 'correct number of table cells' );
          assert.strictEqual( $('#repos-tbody td a:first-child').attr('href'), '#repo-detail_Repo-name1', 'correct href assigned in first anchor' );
          assert.strictEqual( $('#repos-tbody tr:first-child td:nth-child(2)').text(), '3', 'correct value in table cell' );
          assert.strictEqual( $('#repos-tbody tr:nth-child(2) td:nth-child(3)').text(), '48', 'correct value in table cell' );

      });

      test('Appending Repos works with undefined in its argument', function() {

          assert.strictEqual( $('#repos-tbody tr').length, 0, 'no link to start' );
          window.ght._appendRepos(undefined);
          assert.strictEqual( $('#repos-tbody tr').length, 1, 'no trs present after append' );
          assert.strictEqual( $('#repos-tbody td a:first-child').attr('href'), '#repo-detail_undefined', 'correct href assigned in first anchor' );
          assert.strictEqual( $('#repos-tbody tr:first-child td:nth-child(2)').text(), 'undefined', 'undefined value in table cell' );
          assert.strictEqual( $('#repos-tbody tr:first-child td:nth-child(3)').text(), 'undefined', 'undefined value in table cell' );

      });


  });



})();
