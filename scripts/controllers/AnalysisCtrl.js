// create the controller and inject Angular's $scope
seedApp.controller('analysisController', function($scope, $http, emailService) {
    // create a message to display in our view
    $scope.email = emailService.getEmail();

    // Simple POST request example (passing data) :
	$http.get('/todo_endpoint', $scope.email).
	  then(function(response) {
	  	console.log(response);
	    // this callback will be called asynchronously
	    // when the response is available
	  }, function(response) {
	  	console.log(response);
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	  });


    $scope.displayResults = function() {
    	//todo
    }
});