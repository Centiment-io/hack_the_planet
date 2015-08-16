var express = require('express');
var mongoose 

//starting code

//Check for emails and then populates email_detailed
var ML = require("./MachineLearning.js");
ML.start(function(){
	//Now, we will analyze data and write to JSON file.
	var calldb = require("./calldb.js");
	calldb.start(function(){

		console.log("Finished, refresh the graph!");


	});


	//After analyzing data, refresh the graph?



});

