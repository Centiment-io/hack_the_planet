var express = require('express')
var SendGrid = require('sendgrid-nodejs').SendGrid;

var app = express()


app.get('/email', function(req, res) {
    var sendgrid = new SendGrid('nmusgrave', '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');
    sendgrid.send({
      to: 'naomi.g.musgrave@gmail.com',
      from: 'naomi.g.musgrave@gmail.com',
      subject: 'Hello World',
      text: 'My first email through SendGrid'
    });
});

app.use(express.static(__dirname + '/public'));

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port " + 8080);
