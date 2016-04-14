// http://nodejs.org/api.html#_child_processes
var sys = require('sys')
var express = require('express')
var exec_m = require('child_process').exec;
//var exec_c = require('child_process').exec;
var app = express()

app.all('*', function(req, res, next) {
    var responseSettings = {
        "AccessControlAllowOrigin": req.headers.origin,
        "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
        "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
        "AccessControlAllowCredentials": true
    };

    res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
    res.header("Access-Control-Allow-Origin",  responseSettings.AccessControlAllowOrigin);
    res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
    res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);

    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
});

function puts(error, stdout, stderr) { sys.puts(stdout) }

app.get('/eeg_start', function(req, res) {
    //exec_m("muse-io --osc osc.udp://localhost:5000,osc.udp://localhost:5001", puts);
	exec_m("muse-player -i /muse/elements/experimental/mellow -l udp:5000 -C output_mellowness_1.csv -s osc.udp://localhost:5002", puts);
	exec_c("muse-player -i /muse/elements/experimental/concentration -l udp:5000 -C output_concentration_1.csv -s osc.udp://localhost:5001", puts);
    res.send("starting");
});

app.get('/eeg_stop', function(req, res) {
    console.log("stop");
    exec_c.kill();
    exec_m.kill();
    res.send("stopping");
});

app.use(express.static(__dirname + '/public'));

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port " + 8080);