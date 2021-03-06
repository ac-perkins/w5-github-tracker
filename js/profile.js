(function(ght) {
  'use strict';

    ght.profile = {};

    ght.profile.load = function loadProfile() {

        $('#profile ul').empty();
        appendProfile(
            ght.ghUser.url,
            ght.ghUser.userName,
            ght.ghUser.name,
            ght.ghUser.repos,
            ght.ghUser.followers,
            ght.ghUser.following,
            ght.ghUser.created,
            ght.ghUser.avatar
        );
    };


    function appendProfile(url, userName, name, repos, followers, following, created, avatar) {
        $('#profile ul')
            .append( $('<img>').attr( {src: avatar, class: 'avatar_img'} ) )
            .append( $('<li>').text('Username: ')
                .append( $('<a>').attr( {href: url, target: '_blank'} ).text(userName) )
            )
            .append( $('<li>').text('Name: ' + name) )
            .append( $('<li>').text('Repos: ' + repos) )
            .append( $('<li>').text('Followers: ' + followers + ' (following ' + following + ')') )
            .append( $('<li>').text('Account created: ' + created.substr(0, 10)) );
    }


  window.ght = ght;

})(window.ght || {});
