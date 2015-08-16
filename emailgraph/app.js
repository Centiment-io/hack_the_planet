var express = require('express');

//starting code

console.log("hi");
//Check for emails and then populates email_detailed
var ML = require("./MachineLearning.js");
ML.start(function(){
	//Now, we will analyze data and write to JSON file.
	console.log("machine learning done");
	var calldb = require("./db1");
	baton = [ML.mongoose,ML.emaildetailed];
	calldb.start(baton,function(){

		console.log("Finished, refresh the graph!");


	});


	//After analyzing data, refresh the graph?



});

