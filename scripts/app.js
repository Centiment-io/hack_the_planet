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
        setEmail: function(recipient, sender, subject, message) {
            email.recipient = recipient;
            email.sender = sender;
            email.subject = subject;
            email.message = message;
            email.timestamp = Date.now();
        },
        getEmail: function() {
            return email;
        },
        setConcentration: function(concentration) {
            email.concentration = concentration;
        },
        setMellowness: function(mellowness) {
            email.mellowness = mellowness;
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