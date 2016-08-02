//Listeners
document.addEventListener("DOMContentLoaded", newExercise);

	
function newExercise(){
  document.getElementById("submit").addEventListener("click", function(event){
	event.preventDefault();
	console.log("Button Clicked!");
	var query = new XMLHttpRequest();
	
	var content={
	  name: document.getElementById("name").value,
	  reps: document.getElementById("reps").value,
	  weight: document.getElementById("weight").value,
	  date: document.getElementById("date").value,
	  type: document.getElementById("type").value
	  }
	  
	console.log(content);
	string="/insert?name="+content.name+"&reps="+content.reps+"&weight="+content.weight+"&date="+content.date+"&type="+content.type;
	query.open("GET", string, true);
	query.send(null);
	query.addEventListener("load", function(){
      if(query.status >=200 && query.status < 400){
        var locate = document.getElementById("submit");
        var message = document.createElement("div");
        console.log("Got to this point!");
        message.textContent="Submitted New Exercise";
        locate.appendChild(message);
        }
      else{
        var locate = document.getElementsByName("submit");
        var message = document.createElement("div");
        console.log("Got to this point!");
        message.textContent="Server Error";
        locate.appendChild(message);
        }
    });
  });
}
	

	

	

  
  
  