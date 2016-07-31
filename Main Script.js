//Express and Parser Management
var express = require('express');
var app= express();
var handlebars = require('express-handlebars').create({defaultLayout:'default'});
var parser = require('body-parser');
var mysql = require(./server.js);

//Express and Parser initialization
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(parser.urlencoded({ extended: false}));
app.use(parser.json());
app.set('port', 3000);

app.get('/', function(req, res){
  res.render('home');
  );

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});