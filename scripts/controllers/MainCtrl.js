// create the controller and inject Angular's $scope
seedApp.controller('mainController', function($scope, $location, $q, emailService) {
	$scope.recipient = "foo@foo";
	$scope.sender = "bar@bar";
	$scope.subject = "baz";
	$scope.message = "alkdjfal;ksdfjas";
    $scope.concentration = 0;
    $scope.mellowness = 0;
    $scope.csv_concentration = "concentration.csv";
    $scope.csv_mellowness = "mellowness.csv";

    // create a message to display in our view

    $scope.startRecording = function() {
    	// open file TODO
	    open($scope.csv_concentration);
	    open($scope.csv_mellowness);

    	// begin collecting brain-wave data
    }

    $scope.finishRecording = function() {
    	// finish collecting brain-wave data

    	// save file

    	var txt = $scope.asyncReadFile("README.md").then(
    		function(asyncText) {
		    	console.log(txt);

    		});

    	// process data
    	/*
    	$scope.concentration = $scope.processEEG($scope.csv_concentration);
    	$scope.mellowness = $scope.processEEG($scope.csv_mellowness);

    	// clean files
	    close($scope.csv_concentration);
	    close($scope.csv_mellowness);
	    */

    	// save email
    	emailService.setEmail(0, 0, $scope.recipient, $scope.sender, $scope.subject, $scope.message);
    	// change view
    	$location.path("analysis");
    }

    /** Parses a CSV file of EEG readings and computes the average reading */
    $scope.processEEG = function(csv) {
    	var readingTotal = 0;
    	var readingsList = csv.split("\n");
    	for (var i = 0; i < readingsList.length; i++) {
    		var line = readingsList[i].split(","); 
    		var reading = line[2];

    		readingTotal += reading;
    	}
    	return readingTotal / readingsList.length();
    }

    $scope.asyncReadFile = function(file) {
    	var result = $q.defer();
	    var rawFile = new XMLHttpRequest();
	    rawFile.open("GET", file, false).then(
	    	function(text) {
	    		console.log(text);
	    		result.resolve(text);
	    	});
	    /*
	    rawFile.onreadystatechange = function ()
	    {
	        if(rawFile.readyState === 4)
	        {
	            if(rawFile.status === 200 || rawFile.status == 0)
	            {
	                var allText = rawFile.responseText;
	                result.resolve(allText);
	            }
	        }
	    }
	    */
	    //rawFile.send(null);
	    return result.promise;
	}
});