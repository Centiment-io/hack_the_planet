// create the controller and inject Angular's $scope
seedApp.controller('mainController', function($scope) {
    // create a message to display in our view
    $scope.message = 'Starter page!';

    $scope.concentration;
    $scope.mellowness;

    /** Parses a CSV file of EEG readings and computes the average reading */
    function processEEG(csv) {
    	var readingTotal = 0;

    	var readingsList = csv.split("\n");
    	for (var i = 0; i < readingsList.length; i++) {
    		var line = readingsList[i].split(","); 
    		var reading = line[2];

    		readingTotal += reading;
    	}

    	return readingTotal / readingsList.length();
    }   

    function getConcentrationReading() {
    	return $scope.concentration;
    } 

    function getMellowReading() {
    	return $scope.mellow;
    }
});