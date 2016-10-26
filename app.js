var express = require('express');
var app = express();
var port=Number(process.env.PORT || 3000);


app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
  res.sendFile('public/index.html' , { root : __dirname});
  console.log("hie");
});



app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});