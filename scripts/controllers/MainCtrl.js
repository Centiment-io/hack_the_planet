// create the controller and inject Angular's $scope
seedApp.controller('mainController', function($scope, $location, emailService) {
		$scope.recipient = "foo@foo";
		$scope.sender = "bar@bar";
		$scope.subject = "baz";
		$scope.message = "alkdjfal;ksdfjas";
        // create a message to display in our view

        $scope.startRecording = function() {
        	// open file
        	// begin collecting brain-wave data
        }

        $scope.finishRecording = function() {
        	// finish collecting brain-wave data
        	// save file
        	// save email
        	emailService.setEmail(0, 0, $scope.recipient, $scope.sender, $scope.subject, $scope.message);
        	// change view
        	$location.path("analysis");
        }

        /*
        $scope.concentration;
        $scope.mellow;

        var processEEG(csv) {
        	var columns;
        	var lines = csv.split(/\r\n|\n/);
        }
        */
});