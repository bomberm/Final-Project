//Express and Parser Management
var express = require('express');
var app= express();
var handlebars = require('express-handlebars').create({defaultLayout:'default'});
var parser = require('body-parser');
var mysql = require('./server.js');

//Express and Parser initialization
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(parser.urlencoded({ extended: false}));
app.use(parser.json());
app.set('port', 3000);

app.post('/', function(req, res){
  res.render('exercise');
  });

//mysql setup?
app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){ //replace your connection pool with the your variable containing the connection pool
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    mysql.pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('reset', context);
    })
  });
});


  app.use(function(req,res){
  res.render('oops404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.render('embarrassing500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});