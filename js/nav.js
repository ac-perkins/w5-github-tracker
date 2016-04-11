(function(ght) {
  'use strict';

    window.addEventListener('hashchange', function hashNav() {
          doNav();
      });

    function doNav() {

        $('.view').hide();
        $( window.location.hash ).show();

        $('nav li').removeClass('active');

        $('nav a[href="' + window.location.hash + '"]').closest('li').addClass('active');

        var hashSplit = window.location.hash.substr(1).split(/_(.*)?/);
        console.log(hashSplit);

        if (!ght.ghToken) {
            $('main').hide();
            window.location.hash = '#login';
        }
        else {
            $('main').show();
            var viewName = window.location.hash.substr(1);
            console.log(viewName);

            if (ght[hashSplit[0]] && ght[hashSplit[0]].load) {
                ght[hashSplit[0]].load(hashSplit[1]);
            }
        }
    }

      ght.init = function() {
          doNav();
      };

      window.ght = ght;

})(window.ght || {});
