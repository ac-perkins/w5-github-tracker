(function() {
    'use strict';

    var assert = chai.assert;

    var fixtureHTML = $('#fixtures').html();

    // describe()
    suite('repo details', function() {

        // beforeEach()
        setup(function() {
            $('#fixtures').html(fixtureHTML);
        });

      });


      test('Appending Repo Detail Nav element works with a string in argument', function() {

          assert.strictEqual( $('#navbar li').length, 0, 'no link to start' );
          window.ght._appendRepoDetailNav('test');
          assert.ok( $('#navbar li').length > 0, 'element exists' );
          assert.ok( $('#navbar li').attr('id'), 'li has id assigned by argument' );

      });








})();
