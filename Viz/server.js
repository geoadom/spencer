#!/usr/bin/nodejs
 
var port = process.env.PORT || 3000;
 
var express = require('express');
 
var app = express();
 
/* 
// register entry points
app.get('/hello', function(req, res) {
  console.log(req.query.args);
  // convert object back to string...(seems a bit perverse?)
  var result = "Hello!";
  res.status(200).send(result);
});
 
// Catch unrecognised incoming requests
app.get('*', function(req, res) {
  res.status(404).send(JSON.stringify({ "error": "route not found"}));
});
 
// Handle errors
app.use(function(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send(JSON.stringify({ "error": "internal server error"}));
  } else {
    next(err);
  }
});
 */
 
console.log("Viz tool RESTful API server started on " + port);
app.listen(port);