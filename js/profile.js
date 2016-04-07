(function(ght) {
  'use strict';

    ght.profile = {};

    ght.profile.load = function loadProfile() {
        // Do an ajax call to get article data


        console.log('loading profile');
        $('#profile ul').empty();
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
            .append( $('<img>').attr( {src: ght.ghUser.avatar, class: 'avatar_img'} ) )
            ;
    };



  window.ght = ght;

})(window.ght || {});
