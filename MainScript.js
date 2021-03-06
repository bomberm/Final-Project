//Express and Parser Management
var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'default'});
var parser = require('body-parser');
var mysql = require('./public/javascripts/server.js');
var path = require('path');

//Express and Parser initialization
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(parser.urlencoded({ extended: false}));
app.use(parser.json());
app.set('port', 3000);
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', function(req, res, next){
  var context = {display: []};
  mysql.pool.query("SELECT id, name, reps, weight, DATE_FORMAT(date,'%Y-%m-%d') AS date, lbs FROM `workouts`", function(err, rows, fields){
    if(err){
	  console.log("Something went wrong here");
      next(err);
      return;
    }
	for(var i=0; i<rows.length; i++){
	  if(rows[i].lbs==1) rows[i].lbs="lbs";
	  else rows[i].lbs="kg";
	  rows[i].date=String(rows[i].date)
	  rows[i].date=rows[i].date.substring(0,15);
	  }
	context.display=rows;
    res.render('exercise', context);
  });
});

app.get('/insert',function(req,res,next){
  var context = {};
	if(req.query.name === "") return;
  mysql.pool.query("INSERT INTO workouts (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?, ?, ?, ?, ?)", [req.query.name, req.query.reps, req.query.weight, req.query.date, req.query.type], function(err, result){
    if(err){
      next(err);
      return;
    }
	resultID=result.insertId;
    context.results = "Inserted id " + resultID;
	console.log(context.results);
	var result=mysql.pool.query("SELECT id, name, reps, weight, DATE_FORMAT(date,'%Y-%m-%d') AS date, lbs FROM workouts WHERE id="+resultID, function(err, rows, fields){
	  if(err){
	    next(err);
		return;
		}
	  res.send(rows);
	  });
  });
});
  
app.get('/delete', function(req, res, next){
  mysql.pool.query("DELETE FROM workouts WHERE id="+req.query.id, function(err, result){
    if(err){
      next(err);
      return;
      }
	var response =  "Deleted contents of row "+req.query.id
    console.log(response);
	res.send(response);
	});
});


app.get('/edit', function(req, res, next){
  mysql.pool.query("SELECT  id, name, reps, weight, DATE_FORMAT(date,'%Y-%m-%d') AS date, lbs FROM workouts WHERE id="+req.query.id, function(err, rows, fields){
	  if(err){
			next(err);
			return;
			}
		res.render('GETview', rows[0]);
	});
});

app.get('/update', function(req, res, next){
  mysql.pool.query("SELECT * FROM workouts WHERE id=?", [req.query.id], function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
	  var current= rows[0];
		console.log(current);
		var search="UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=? " //moved for debugging, no need to move back
  mysql.pool.query(search, [req.query.name || current.name, req.query.reps || current.reps, req.query.weight || current.weight, req.query.date || current.date, req.query.lbs || current.lbs, current.id], 
		function(err, result){
			if(err){
				next(err);
				return;
			}
			var result = "Updated "+ result.changedRows + " rows.";
			console.log(result);
			res.send(result);
		});
	});
});

//mysql setup... I hope
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


app.use(function(err, req, res, next){
  console.error(err.stack);
  res.render('embarrassing500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});