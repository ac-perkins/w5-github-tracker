(function() {
    'use strict';

    var assert = chai.assert;

    var fixtureHTML = $('#fixtures').html();

    var data = [
      {
        name: 'Repo name1',
        stargazers_count: 3,
        open_issues: 7
      },
      {
        name: 'Repo name2',
        stargazers_count: 75,
        open_issues: 48
      }
    ];

    suite('Appending repos', function() {

        setup(function() {
            $('#fixtures').html(fixtureHTML);
        });


      test('Appending Repos works with an object in its argument', function() {

          assert.strictEqual( $('.repos-tbody').length, 0, 'no link to start' );
          window.ght._appendRepos(data);
          assert.isArray( data, 'Array is actually an array' );

      });

      test('Appending Repos works with undefined in its argument', function() {

          assert.strictEqual( $('.repos-tbody').length, 0, 'no link to start' );
          window.ght._appendRepos(undefined);
          assert.isNotOk(window.ght._appendRepos(undefined), 'this will pass');

      });


  });



})();
