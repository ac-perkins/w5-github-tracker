(function(ght) {
  'use strict';

  window.addEventListener('hashchange', function hashNav() {
          doNav();
      });

      function doNav() {
          $('.view').hide();
          var newView = $( window.location.hash ).show();

          // $('nav li').removeClass('active');

          // $('nav a[href="' + window.location.hash + '"]').closest('li').addClass('active');

          if (newView.length === 0 || !ght.ghToken) {
              // if they try to load a bad view, default to login!
              window.location.hash = '#login';
          } else {
              // do stuff the view needs


              var viewName = window.location.hash.substr(1);
              console.log(viewName);

              if (ght[viewName] && ght[viewName].load) {
                  // ns['view-1'].load();
                  ght[viewName].load();
              }
          }
      }


      // navigate to a view when the page loads
      ght.init = function() {
          doNav();
      };

      window.ght = ght;

})(window.ght || {});
