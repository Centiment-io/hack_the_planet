var mongodb = require('mongodb');
var mongoose = require('mongoose');

var url = 'mongodb://52.6.238.55:27017/CONNECTIONS';
mongoose.connect(url);
call=function(){}
baton=[mongoose];
var firstpart = require('./db1');
firstpart.start(baton,call);