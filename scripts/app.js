var seedApp = angular.module('seedApp', ['ngRoute'])
.service('emailService', function() {
    var email = {
        musec: 0,
        musem: 0,
        to: '',
        from: '',
        body: '',
    };

    return {
        setEmail: function(to, from, body) {
            email.to = to;
            email.from = from;
            email.body = body;
        },

        getEmail: function() {
            return email;
        },
        setMusec: function(musec) {
            email.musec = musec;
        },
        setMusem: function(musem) {
            email.musem = musem;
        }
    };
});

// configure routes
seedApp.config(function($routeProvider) {
  $routeProvider
    .when('/', {
            templateUrl : 'views/main.html',
            controller  : 'mainController'
    })
    .when('/analysis', {
            templateUrl : 'views/analysis.html',
            controller  : 'analysisController'
    })
});