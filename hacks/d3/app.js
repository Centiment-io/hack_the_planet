var express = require('express');
var app = express();

app.get('/javascripts/ShortestPathCalculator.js', function(req,res){
  res.sendfile(__dirname + '/javascripts/ShortestPathCalculator.js');

});

app.get('/javascripts/ShortestPathUtils.js', function(req, res){
  res.sendfile(__dirname + '/javascripts/SHortestPathUtils.js');

});


app.get('/', function(req, res){
 res.sendfile(__dirname + '/front.html');

});

app.get('/bg.png', function(req, res){
  res.sendfile(__dirname + '/bg.png');
});

app.get('/alienleague.ttf', function(req,res){
  res.sendfile(__dirname + '/alienleague.ttf');
});

app.get('/data.json', function(req,res){
  res.sendfile(__dirname + '/data.json');
});

app.get('/analyze', function(req,res){
  res.sendfile(__dirname + '/test.html');
});

var server = app.listen(2001, function(){
var host = server.address().address;
var port = server.address().port;

console.log('Example app listening at http://%s:%s', host, port);
});
