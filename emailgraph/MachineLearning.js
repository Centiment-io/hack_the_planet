/**
 * MachineLearning.js - Utilizes Microsoft's Azure and Prediction.io for emotion machine learning.
 * Purpose - Queries database for email content to run through machine learnings.
 */

exports.start = function(callback) {

    var http = require('http');
    var mongodb = require('mongodb');
    var mongoose = require('mongoose');
    var async = require('async');
    var request = require('request');

    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://52.6.238.55:27017/CONNECTIONS';
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

    var emailDetailedSchema = new Schema({
        from: String,
        to: String,
        body: String,
        musec: Number,
        musem: Number,
        sentiment: Number
    }, {collection: 'email_detailed'});

    var Email = mongoose.model('Email', emailSchema);
    var EmailDetailed = mongoose.model('EmailDetailed', emailDetailedSchema);

    // Azure Account Key
    AZURE_KEY = 'QWNjb3VudEtleTo1WitlNTFQYnV0bUxYMFphN25VcmpWalF0N3ljdzNMTTROVXFnenM4MTh3PQ==';


    // Clear new database
    EmailDetailed.find().remove().exec();
    console.log('email_detailed cleared');

    Email.find({}, function (err, emails) {

        var azure_email_sentiment;

        // First run each email through Azure's machine learning, then Prediction.io.
        async.eachSeries(emails, function (email, callback2) {

            // Azure's machine learning
            request({
                url: 'https://api.datamarket.azure.com/data.ashx/amla/text-analytics/v1/GetSentiment', //URL to hit
                qs: {Text: email.body}, //Query string data
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + AZURE_KEY,
                    'Accept': 'application/json'
                }
            }, function (error, response, body) {
                if (error) {
                    console.log(error);
                } else {
                    // Store sentiment value
                    console.log(JSON.parse(String(body)).Score);

                    azure_email_sentiment = JSON.parse(body).Score;

                    request({
                        url: 'http://52.6.238.55:8000/queries.json', //URL to hit
                        body: "{\"s\": " + email.body + "}", //Query string data
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }, function (eerror, eresponse, ebody) {
                        if (eerror) {
                            console.log(eerror);
                        } else {

                            var precio_sentiment = JSON.parse(ebody).sentiment / 4; // Scale is from 0-4
                            var avg_sentiment = ( precio_sentiment + azure_email_sentiment) / 2;

                            // Store sentiment into database
                            var email_detailed = new EmailDetailed({
                                from: email.from,
                                to: email.to,
                                body: email.body,
                                musec: email.musec,
                                musem: email.musem,
                                sentiment: avg_sentiment
                            });

                            email_detailed.save(function (err, data) {
                                if (err) console.log(err);
                                else console.log('Saved : ', data);
                            });

                            email.remove();
                            callback2();
                        }
                    });

                }
            });

        },function(){
		
		callback();
	});

    });

    module.exports.mongoose=mongoose;
    module.exports.emaildetailed=EmailDetailed;

}
