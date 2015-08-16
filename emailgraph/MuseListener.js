/**
 * MuseListener.js - Waits for data from client-side via POST request and stores into database. This file should be run separately.
 * POST Request: 
 *    1. from (Email sent from)
 *    2. to (Email sent to)
 *    3. body (Email content)
 *    4. musec (Muse calmness)
 *    5. musem (Muse mellowness)
 */

exports.start = function(callback){

    var mongodb = require('mongodb');
    var mongoose = require('mongoose');

    http = require('http');
    fs = require('fs');

    // Connection URL. This is where your mongodb server is running.
    var url = 'mongodb://52.6.238.55:27017/CONNECTIONS';
    mongoose.connect(url);

    var Schema = mongoose.Schema;

    var emailSchema = new Schema({
        from: String,
        to: String,
        body: String,
        musec: Number,
        musem: Number
    }, {collection: 'email'});


    var Email = mongoose.model('Email', emailSchema);

    server = http.createServer( function(req, res) {

        console.dir(req.param);
            console.log("POST");
            var body = '';
            req.on('data', function (data) {
    	    body += data;
                console.log("Partial body: " + body);
            });
            req.on('end', function () {
    	    var params = getUrlVars(body);
    	    console.log(params);

    	    var email = new Email({
                    from : params.from,
                    to : params.to,
                    body : params.body,
                    musec : params.musec,
    	  	    musem : params.musem
                });

                email.save(function (err, data) {
                    if (err) console.log(err);
                    else console.log('Saved : ', data );
                });

    	    console.log("data saved to db");
    	});
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('post received');
    });

    port = 9000;
    host = '0.0.0.0';
    server.listen(port, host);
    console.log('Listening at http://' + host + ':' + port);
}

// Handle URL to JSON
function getUrlVars(url) {
    var hash;
    var myJson = {};
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        myJson[hash[0]] = hash[1];
    }
    return myJson;
}

