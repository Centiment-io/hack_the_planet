//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
var mongoose = require('mongoose');

var async = require('async');

//Load the request module
var request = require('request');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://52.6.238.55:27017/CONNECTIONS';

// Azure Account Key
AZURE_KEY = 'QWNjb3VudEtleTo1WitlNTFQYnV0bUxYMFphN25VcmpWalF0N3ljdzNMTTROVXFnenM4MTh3PQ==';

mongoose.connect(url);
console.log('Connection established.');

var Schema = mongoose.Schema;

var emailSchema = new Schema({
    from: String,
    to: String,
    body: String,
    musec: Number,
    musem: Number
}, {collection: 'email'});

var emailDetailedSchema = new Schema ({
    from: String,
    to: String,
    body: String,
    musec: Number,
    musem: Number,
    sentiment: Number
}, {collection: 'email_detailed'});

var Email = mongoose.model('Email', emailSchema);
var EmailDetailed = mongoose.model('EmailDetailed', emailDetailedSchema);

// Clear new database
EmailDetailed.find().remove().exec();
console.log('email_detailed cleared');

Email.find({}, function(err, emails) {

// Go through each email, run through Azure's machine learning, and store into email_detailed table in database
async.eachSeries(emails, function(email, callback){

	// Azure's machine learning
        request({
        url: 'https://api.datamarket.azure.com/data.ashx/amla/text-analytics/v1/GetSentiment', //URL to hit
        qs: {Text: email.body}, //Query string data
        method: 'GET',
        headers: {
            'Authorization': 'Basic '+AZURE_KEY,
            'Accept': 'application/json'
        }
    }, function(error, response, body){
          if(error) {
              console.log(error);
          } else {

	    // Store sentiment value
              console.log(JSON.parse(String(body)).Score);

	    var email_sentiment = JSON.parse(body).Score;

            console.log(JSON.parse(body).Score);
	    var email_detailed = new EmailDetailed({
		from : email.from,
		to : email.to,
		body : email.body,
		musec : email.musec,
		musem : email.musem,
		sentiment: email_sentiment
	    });

	    email_detailed.save(function (err, data) {
	        if (err) console.log(err);
	        else console.log('Saved : ', data );
	    });

	    email.remove();

              callback();
        }
       });
    
    });
    
});


module.exports.Email;
