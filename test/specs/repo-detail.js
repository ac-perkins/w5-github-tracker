(function() {
    'use strict';

    var assert = chai.assert;

    var fixtureHTML = $('#fixtures').html();

    suite('repo details', function() {

        setup(function() {
            $('#fixtures').html(fixtureHTML);
        });


      test('Appending Repo Detail Nav element works with a string in argument', function() {

          assert.strictEqual( $('.repo-detail a').length, 0, 'no link to start' );
          window.ght._appendRepoDetailNav('test');
          assert.ok( $('.repo-detail a').length > 0, 'element exists' );
          assert.strictEqual( $('.repo-detail a').attr('href'), '#repo-detail_test', 'href value is what is expected' );

      });

      test('Appending Repo Detail Nav element works with undefined in argument', function() {

          assert.strictEqual( $('.repo-detail a').length, 0, 'no link to start' );
          window.ght._appendRepoDetailNav(undefined);
          assert.ok( $('.repo-detail a').length > 0, 'element exists' );
          assert.strictEqual( $('.repo-detail a').attr('href'), '#repo-detail_undefined', 'href value is what is expected' );

      });


  });



})();
