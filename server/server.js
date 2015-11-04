var express = require('express');

var app = express();

var PORT = process.env.PORT || 8000;

app.use(express.static(__dirname + '/../client'));

var server = app.listen(PORT, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Wordpin listening at http://', host, port);
});

module.exports = app;