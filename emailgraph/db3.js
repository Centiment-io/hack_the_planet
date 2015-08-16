var mongodb = require('mongodb');
var mongoose = require('mongoose');
var fs = require('fs');
exports.start = function(users,edges,mongoose){
    //do code
    var n;
    console.log("third part");
    //console.log(edges);
    var Schema = mongoose.Schema;
    var tofile2='';
    var tofile1='';
    users.sort(function(a,b){return a.num-b.num;});
    users.forEach(function(user){
        //console.log(user);
        var a='{"id":"'+user.num+'","name":"'+user.fullname+'","image":"'+user.pic+'","value":"25","email":"'+user.email+'"},\n'
        tofile1=tofile1.concat(a);
    });
    tofile1=tofile1.slice(0,-2);
    edges.forEach(function(edge){
        //console.log(edge);
        var a='{"source":'+edge[0]+',"target":'+edge[1]+',"distance":'+Math.floor(edge[2])+',"width":"20"},\n'
        tofile2=tofile2.concat(a);
    });
    tofile2=tofile2.slice(0,-2);
    //console.log(tofile1);
    //console.log(tofile2);
    var text='{"nodes":['+tofile1+'],\n"links":['+tofile2+']}'
    fs.writeFile("./test.txt", text, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 
}