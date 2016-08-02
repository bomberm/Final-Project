//Listeners
document.addEventListener("DOMContentLoaded", newExercise);

var counter=(-1);	//counter to work as ID placeholder for new rows
function newExercise(){
  var root = document.getElementsByTagName("tbody")[0]; //grab the table for use in adding rows
  //submit button management
  document.getElementById("submit").addEventListener("click", function(event){
	event.preventDefault();
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
        var row = document.createElement("tr");
		root.appendChild(row);
		var idCell = document.createElement("tr");
		idCell.textContent=counter--;//assign temp ID for new cell to be used in case of an edit.
		idCell.style.visibility="collapse";
		row.appendChild(idCell);
		for(item in content){
		  console.log(content[item]);
		  var cell= document.createElement("td");
		  cell.textContent=content[item];
		  row.appendChild(cell);
		  }
        console.log("Got to this point!");
        }
      else{
        var locate = document.getElementsByName("submit");
        var message = document.createElement("div");
        message.textContent="Server Error";
        locate.appendChild(message);
        }
    });
  });
}
	

	

	

  
  
  