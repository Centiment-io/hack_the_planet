exports.start = function(baton,callback){    
    var mongodb = require('mongodb');
    var mongoose=baton[0];
    var Schema = mongoose.Schema;
    
    console.log("firstpart");
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
        var secondpart = require('./db2');
        baton.push(ranks);
        secondpart.start(baton,callback);
        
    });
}
function scorer (senti,musec,musem){
    return Math.max(0,Math.min(1,0.5*musem/(musem+musec)+senti*1.2*musec/(musem+musec)));
}

