//Listeners
document.addEventListener("DOMContentLoaded", newExercise);


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
	  
	  
	string="/insert?name="+content.name+"&reps="+content.reps+"&weight="+content.weight+"&date="+content.date+"&type="+content.type;
	query.open("GET", string, true);
	query.send(null);
	query.addEventListener("load", function(){ 
      if(query.status >=200 && query.status < 400){
				var response = JSON.parse(query.responseText);
        var row = document.createElement("tr");
			root.appendChild(row);
			var first = true; //cell collapse flag
			if(response[0].lbs==1) response[0].lbs="lbs"
			else response[0].lbs="kgs";
			for(item in response[0]){
				var cell= document.createElement("td");
				cell.textContent=response[0][item];
				if(first){ //collapses ID cell
				first=false;
        cell.style.visibility="collapse";
				}
				row.appendChild(cell);
		  }
			var buttonCell = document.createElement("td");
			var editButton = document.createElement("button");
			var deleteButton = document.createElement("button");
			editButton.style.onClick="editRow("+response[0].id+")";
			editButton.style.name="edit";
			buttonCell.appendChild(editButton);
			deleteButton.style.onClick="deleteRow("+response[0].id+")"
			deleteButton.style.name="delete";
			buttonCell.appendChild(deleteButton);
			row.appendChild(buttonCell);
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

function deleteRow(id){
  var killCommand = new XMLHttpRequest();

  string="/delete?id="+id;
  killCommand.open("GET", string, true);
  killCommand.send(null);
  killCommand.addEventListener("load", function(){ 
    if(killCommand.status >=200 && killCommand.status < 400){
	  var row = document.getElementById(id);
	  var parent = row.parentNode;
	  parent.removeChild(row);
	}
    else{
      console.log("Error: " + killCommand.statusText);
      }
	});
}
   
  
function editRow(id){
  window.location.href = "/edit?id="+id;
}	

function finish(){
  var update= new XMLHttpRequest();
	
	var content={
	id: document.getElementById("myID").value,
	name: document.getElementById("name").value,
	reps: document.getElementById("reps").value,
	weight: document.getElementById("weight").value,
	date: document.getElementById("date").value,
	type: document.getElementById("type").value
	}
	
	var string="/update?id="+content.id+"&name="+content.name+"&reps="+content.reps+"&weight="+content.weight+"&date="+content.date+"&lbs="+content.type;
	update.open("GET", string, true);
	update.send(null);
	update.addEventListener("load", function(){
		if(update.status >=200 && update.status < 400){
		  window.location.href = "/"; //if edit is successful, just need to return to main page
		}
		else{
			console.log("Error: "+update.statusText);
		}
	});
}	
	

  
  
  