//Listeners
document.addEventListener("DOMContentLoaded", newExercise);

function newExercise(){
  document.getElementById("submit").addEventListener("click", function(event){
	event.preventDefault();
	console.log("Button Clicked!");
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
	console.log("Got to this point!");
	message.textContent="Submitted New Exercise";
	locate.appendChild(message);
	});
  });
}
	

  
  
  