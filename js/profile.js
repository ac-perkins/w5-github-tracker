(function(ght) {
  'use strict';

    ght.profile = {};

    ght.profile.load = function loadProfile() {
        // Do an ajax call to get article data
        $('#profile').append(
            '<p>This is the ARTICLE. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>'
        );

        console.log('loading profile');

        ght.appendProfile();
    };


    ght.appendProfile = function () {
        $('#profile ul')
            .append( $('<li>').text('Username: ')
                .append( $('<a>').attr( {href: ght.ghUser.url, target: '_blank'} ).text(ght.ghUser.userName) )
            )
            .append( $('<li>').text('Name: ' + ght.ghUser.name) )
            .append( $('<li>').text('Repos: ' + ght.ghUser.repos) )
            .append( $('<li>').text('Followers: ' + ght.ghUser.followers + ' (following ' + ght.ghUser.following + ')') )
            .append( $('<li>').text('Account created: ' + ght.ghUser.created) )
            ;
    };



  window.ght = ght;

})(window.ght || {});
