var express = require('express')
var SendGrid = require('sendgrid-nodejs').SendGrid;

var app = express()

app.get('/eeg_start', function(req, res) {
    console.log("start");
    
});

app.get('/eeg_stop', function(req, res) {
    console.log("stop");
    
});

app.use(express.static(__dirname + '/public'));

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port " + 8080);
