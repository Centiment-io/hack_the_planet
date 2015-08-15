var seedApp = angular.module('seedApp', ['ngRoute'])
.service('emailService', function() {
    var email = {
        concentration: 0,
        mellowness: 0,
        recipient: '',
        sender: '',
        subject: '',
        message: '',
        timestamp: ''
    };

    return {
        setEmail: function(concentration, mellowness, recipient, sender, subject, message) {
            email.concentration = concentration;
            email.mellowness = mellowness;
            email.recipient = recipient;
            email.sender = sender;
            email.subject = subject;
            email.message = message;
            email.timestamp = Date.now();
        },
        getEmail: function() {
            return email;
        }
    };
});

// configure routes
seedApp.config(function($routeProvider) {
  $routeProvider

    // route for the home page
    .when('/', {
            templateUrl : 'views/main.html',
            controller  : 'mainController'
    })

    // route for the about page
    .when('/analysis', {
            templateUrl : 'views/analysis.html',
            controller  : 'analysisController'
    })
});