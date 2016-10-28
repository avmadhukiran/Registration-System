var express = require('express');
var app = express();
var port = Number(process.env.PORT || 3000);
var path = require('path');
var bodyParser = require('body-parser')
var Datastore = require('nedb'),
    db = new Datastore({
        filename: 'datafile'
    });
db.loadDatabase();
var doc = {
    aarohanid: '123456',
    sel1: 'event1'
}

var urlencodedParser = bodyParser.urlencoded({
    extended: false
})

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
    res.sendFile('public/index.html', {
        root: __dirname
    });
});







        app.post('/check', urlencodedParser, function(req, res) {
            if (!req.body) return res.sendStatus(400)
            {
              db.find({aarohanid: req.body.aarohanid}, function(err, docs) {
                    if (docs.length != 0) {
                      res.send('1');
                    } else
                        db.insert({aarohanid: req.body.aarohanid,names: req.body.names,school: req.body.school}, function(err, newDoc) {
                          res.send('2')

                        });
                });
            }
        });



        app.listen(3000, function() {
            console.log('Example app listening on port 3000!');
        });
