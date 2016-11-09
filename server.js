// MEAN Stack RESTful API Tutorial - Contact List App

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('mongodb://aarohan2k16:aarohan2k16@ds137267.mlab.com:37267/aarohan16', ['contactlist','aarohanregistrationpage']);
var bodyParser = require('body-parser');
var port = Number(process.env.PORT || 8000);
var doc = [
            { username: 'admin', password:'admin'}
          ];
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login',function (req,res){
console.log("login requested");
console.log(req.body.username);
var name = req.body.username;
var pass = req.body.password;

console.log(doc[0].username+"       user");
console.log(name);
if(doc[0].username==name&&doc[0].password==pass)
res.sendFile(__dirname +'/public/select.html');
else
res.sendFile(__dirname +'/public/error.html');


})
app.get('/register',function(req,res){
res.sendFile(__dirname +'/public/register.html');


})

app.get('/events',function(req,res){
res.sendFile(__dirname +'/public/events.html');


})
app.get('/contactlist', function (req, res) {
  console.log('I received a GET request');
  db.contactlist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.get('/contactlist/:eve', function (req, res) {
  var events = req.params.eve;
  var somejson = {};
  somejson[events] = true;
  db.contactlist.find(somejson,function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});



app.get('/aarohanregistrationpage/:aarohanid', function (req, res) {
  var names = req.params.aarohanid;
  db.aarohanregistrationpage.find({aarohanid:names}, function (err, doc) {
    res.json(doc);
  });
});


app.get('/aarohanregistrationpage', function (req, res) {
  console.log('I received a GET request');
  db.contactlist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});


app.post('/contactlist', function (req, res) {
  console.log(req.body);
  db.contactlist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});




app.get('/aarohanregistrationpage/:aarohanid', function (req, res) {
  var names = req.params.aarohanid;
  db.aarohanregistrationpage.find({aarohanid:names}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/contactlist/ev/:aarohanid', function (req, res) {
  var names =  req.params.aarohanid;
  db.contactlist.find({aarohanid:names}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/contactlist/:evupdate', function (req, res) {
  var events = req.params.evupdate;
  var id = req.body.aarohanid;
  var somejson = {};
  somejson[events] = true;

    db.contactlist.update({ aarohanid: id },{ $set: somejson} ,true,function (err, doc) {res.json(doc);});

});


app.put('/contactlist/del/:evupdate', function (req, res) {
  var events = req.params.evupdate;
  var id = req.body.aarohanid;
  var somejson = {};
  somejson[events] = false;
  console.log(somejson);
    db.contactlist.update({ aarohanid: id },{ $set: somejson} ,true,function (err, doc) {res.json(doc);});

});


app.post('/check', function(req, res) {
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

app.listen(port);
console.log("Server running on port 8000");
