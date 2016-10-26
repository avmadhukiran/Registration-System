var express = require('express');
var app = express();
// var port=Number(process.env.PORT || 3000);
var path = require('path');
var bodyParser = require('body-parser')
var Datastore = require('nedb'), db = new Datastore({filename : 'datafile'});
db.loadDatabase();
var doc={ aarohanid:'123456',
		  sel1: 'event1'}

var urlencodedParser = bodyParser.urlencoded({ extended: false })

db.insert(doc, function (err, newDoc) {   // Callback is optional 
  // newDoc is the newly inserted document, including its _id 
  // newDoc has no key called notToBeSaved since its value was undefined 
});
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
  res.sendFile('public/index.html' , { root : __dirname});
  console.log("hie");
});
app.post('/check', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  {db.find({aarohanid :req.body.aarohanid}, function (err,docs){ 
if(docs.length)
  	{console.log(docs);
  
  res.send('sorry' + req.body.aarohanid+'only one entry');}
  else
  	db.insert({aarohanid:req.body.aarohanid,sel1:req.body.sel1},function(err,newDoc){
  		console.log("new doc inserted")
  		console.log(newDoc)
  	res.send('welcome' + req.body.aarohanid+'brooo')	
  	})
   })
  

}
})



app.listen(3000,function () {
  console.log('Example app listening on port 3000!');
});