// create the controller and inject Angular's $scope
seedApp.controller('analysisController', function($scope, $http, emailService) {
    // create a message to display in our view

    $scope.init = function() {
    	    $scope.email = emailService.getEmail();
		$scope.makeCorsRequest();
    }

    // Create the XHR object.
    $scope.createCorsRequest = function(method, url) {
      var xhr = new XMLHttpRequest();
       if ("withCredentials" in xhr) {
            // Check if the XMLHttpRequest object has a "withCredentials" property.
            // "withCredentials" only exists on XMLHTTPRequest2 objects.
            xhr.open(method, url, true);
      } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
      } else {
        // CORS not supported.
        xhr = null;
      }
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
      return xhr;
    }

    // Make the actual CORS request.
    $scope.makeCorsRequest = function() {
      // All HTML5 Rocks properties support CORS.
      var url = 'http://52.6.238.55:9000';

      var xhr = $scope.createCorsRequest('POST', url);
      if (!xhr) {
        return;
      }

      // Response handlers.
      xhr.onload = function() {
        var text = xhr.responseText;
      };

      xhr.onerror = function(err) {
      	console.log(err);
      };

      xhr.send("from=" + $scope.email.from + "&to=" + $scope.email.to + "&body=" + 
      	$scope.email.body + "&musec=" + $scope.email.musec + "&musem=" + $scope.email.musem);
    }
});