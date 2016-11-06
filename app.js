var express = require('express');
var app = express();
var port = Number(process.env.PORT || 8000);
var path = require('path');
var bodyParser = require('body-parser')
// var Datastore = require('nedb'),
//     db = new Datastore({
//         filename: 'datafile'
//     });
// db.loadDatabase();
// var doc = {
//     aarohanid: '123456',
//     sel1: 'event1'
// }

var mongojs   = require('mongojs')
var db = mongojs('mongodb://aarohan2k16:aarohan2k16@ds137267.mlab.com:37267/aarohan16', ['aarohanregistrationpage']);

var urlencodedParser = bodyParser.urlencoded({
    extended: false
})

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
    res.sendFile('public/index.html', {
        root: __dirname
    });
});

db.on('connect', function () {
    console.log('database connected')
})





        app.post('/check', urlencodedParser, function(req, res) {
            if (!req.body) return res.sendStatus(400)
            {
              db.aarohanregistrationpage.find({aarohanid: req.body.aarohanid}, function(err, docs) {
                    if (docs.length != 0) {
                      res.send('1');
                    } else
                        db.aarohanregistrationpage.insert({aarohanid: req.body.aarohanid,category: req.body.category,names: req.body.names,school: req.body.school}, function(err, newDoc) {
                          res.send('2')

                        });
                });
            }
        });



        app.listen(8000, function() {
            console.log('Example app listening on port 8000!');
        });
