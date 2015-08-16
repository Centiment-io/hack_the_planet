// create the controller and inject Angular's $scope
seedApp.controller('mainController', function($scope, $location, $q, $http, emailService) {
	$scope.recipient;
	$scope.sender;
	$scope.subject;
	$scope.message;
    var csv_concentration = "../../output_data/output_concentration_1.csv";
    var csv_mellowness = "../../output_data/output_mellowness_1.csv";

    $scope.startRecording = function() {
    	// open file TODO
	    //open($scope.csv_concentration);
	    //open($scope.csv_mellowness);
        console.log("start");
        // Instantiate the Shell object and invoke its execute method.
        var oShell = new ActiveXObject("Shell.Application");

        var commandtoRun = "C:\\Winnt\\Notepad.exe";
        if (inputparms != "") {
          var commandParms = document.Form1.filename.value;
        }

        // Invoke the execute method.  
        oShell.ShellExecute(commandtoRun, commandParms, "", "open", "1");

        	// begin collecting brain-wave data
    }

    $scope.finishRecording = function() {
    	// finish collecting brain-wave data
        var concentration;
        var mellowness;

    	// save files & process data
    	$scope.asyncReadFile(csv_concentration).then(
    		function(asyncText) {
		    	concentration = $scope.processEEG(asyncText);
                emailService.setMusec(concentration);
	    		//close($scope.csv_concentration);
    		}
    	);

    	$scope.asyncReadFile(csv_mellowness).then(
    		function(asyncText) {
    			mellowness = $scope.processEEG(asyncText);
    			console.log(mellowness);
                emailService.setMusem(mellowness);
	    		//close($scope.csv_mellowness);
    		}
    	);

    	// save email
    	emailService.setEmail($scope.recipient, $scope.sender, $scope.message);
    	// change view
    	$location.path("analysis");
    }

    // Parses a CSV file of EEG readings and computes the average reading
    $scope.processEEG = function(csv) {
    	var readingTotal = 0;
    	var readingsList = csv.split("\n");
    	for (var i = 0; i < readingsList.length; i++) {
    		var line = readingsList[i].split(","); 
            if (line[2] != null) {
                var reading = parseFloat(line[2].trim());
                readingTotal += reading;
            }
    	}
    	return readingTotal / readingsList.length;
    }

    $scope.asyncReadFile = function(file) {
    	var result = $q.defer();
	    var rawFile = new XMLHttpRequest();
	    rawFile.open("GET", file, true);
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
	    rawFile.send(null);
	    return result.promise;
	}
});