var mongodb = require('mongodb');
var mongoose = require('mongoose');

var url = 'mongodb://52.6.238.55:27017/CONNECTIONS';
/*
var MongoDB = mongoose.connect(url).connection;
MongoDB.on('error', function(err) { console.log(err.message); });
MongoDB.once('open', function() {
  console.log("mongodb connection open");
});
*/
mongoose.connect(url);

var Schema = mongoose.Schema;

var emailDetailedSchema = new Schema ({
    from: String,
    to: String,
    body: String,
    musec: Number,
    musem: Number,
    sentiment: Number
}, {collection: 'email_detailed'});


var EmailDetailed = mongoose.model('EmailDetailed', emailDetailedSchema);

var ranks=new Array();

function scorer (senti,musec,musem){
    return Math.max(0,Math.min(1,0.5*musem/(musem+musec)+senti*1.2*musec/(musem+musec)));
}
EmailDetailed.find({}, function(err, emails) {
    if (err){
        console.log(err);
    }
    //console.log(emails);
    emails.forEach(function(email){
        var u=ranks[email.from+","+email.to];
        
        var score=scorer(email.sentiment,email.musec,email.musem);
        if (typeof u === "undefined"){
            ranks[email.from+","+email.to]={};
            ranks[email.from+","+email.to].size=1;
            ranks[email.from+","+email.to].score=score;
        }
        else{
            u.score=(u.score*u.size+score)/(u.size+1);
            u.size+=1;
        }
    });
    console.log("firstpart");
    var secondpart = require('./db2');
    secondpart.start(ranks,mongoose);
    
});
