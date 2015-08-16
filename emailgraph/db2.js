var mongodb = require('mongodb');
exports.start = function(ranks,mongoose){
    //do code
    //to do list: add concentration, change radius, change length
    var n;
    var Schema = mongoose.Schema;
    var userSchema = new Schema ({num: Number, fullname: String, email: String,pic:String},{collection: 'userdata'});
    var User = mongoose.model('Userdata', userSchema);
    var edges=[];
    //console.log(ranks);
    console.log("second part");
    User.find({}, function(err, users) {
        if (err){
            console.log(err);
        }   
        n=users.length;
        //console.log(n);
        for (i=0;i<n;i++){
            for (j=0;j<i;j++){
                var u=ranks[users[i].email+","+users[j].email];
                var v=ranks[users[j].email+","+users[i].email];
                if (typeof u !="undefined" && typeof v!="undefined"){
                    var average=2.0/(1.0/u.score+1.0/v.score);
                    if (average>0.2){
                        edges.push([users[i].num,users[j].num,10.0+4.0/(average+0.01)]);
                    }
                }
            }
        }
        var thirdpart = require('./db3');
        thirdpart.start(users,edges,mongoose);
    
    });
}
