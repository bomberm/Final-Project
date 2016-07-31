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

app.get('/', function(req, res){
  res.render('exercise');
  });

//Listeners
document.addEventListener("DOMContentLoaded", newExercise);

function newExercise(){
  document.getElementById("submit").addEventListener("click", function(event){
	event.preventDefault();
	var content ={}; 
	
	//gather form data
	var name = document.getElementById("name").value;
	var reps = document.getElementById("reps").value;
	var weight = document.getElementById("weight").value;
	var date = document.getElementById("date").value;
	var type = document.getElementById("type").value;
	
	mysql.pool.query("INSERT INTO workouts (name, reps, date, lbs) VALUES(?)"+[name, reps, weight, date,type], function(err, result){
    if(err){
      next(err);
      return;
    }
    var locate = document.getElementsByName("submit");
	var message = document.createElement("div");
	message.textContent="Submitted New Exercise";
	locate.appendChild(message);
	});
  });
}
	

  
  
  
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