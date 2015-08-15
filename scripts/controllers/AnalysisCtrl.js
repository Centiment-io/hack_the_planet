// create the controller and inject Angular's $scope
seedApp.controller('analysisController', function($scope, emailService) {
        // create a message to display in our view
        $scope.email = emailService.getEmail();

        $scope.displayResults = function() {
        	//todo
        }
});