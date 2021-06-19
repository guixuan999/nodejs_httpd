window.onload = function(){
	var div=document.createElement("div");
	div.innerText = "I was created dynamically by running js";
	document.body.appendChild(div);

	document.getElementById("get_boys").addEventListener("click", btn_clicked, false);
	document.getElementById("get_girls").addEventListener("click", btn_clicked, false);
	document.getElementById("get_all").addEventListener("click", btn_clicked, false);
}

function btn_clicked() {
	var url = "/api/classmates/all";
	
	var query_string = "gender=";
	switch(this.id) {
	case "get_boys":
		query_string = query_string + "male";
		break;
	case "get_girls":
		query_string = query_string + "female";
		break;
	case "get_all":
		query_string = "";
		break;
	default:
		query_string = query_string + "impossible";
	}

	if(query_string) {
		url = url + "?" + query_string;
	}

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4) {
			if(xhr.status >= 200 && xhr.status < 300) {
				var classmates = JSON.parse(xhr.responseText);
				
				for(let classmate of classmates) {
					var div=document.createElement("div");
					div.style.border = "none";

					var name=document.createElement("i");
					name.innerText = classmate["name"];
					name.style.backgroundColor = classmate["gender"] == "male" ? "#77DDFF" : "#FFB3FF";
					div.appendChild(name);

					var age=document.createElement("i");
					age.innerText = classmate["age"];
					age.style.backgroundColor = "silver";
					div.appendChild(age);

					var gender = document.createElement("i");
					gender.innerText = classmate["gender"];
					gender.style.backgroundColor = "#77FFCC";
					div.appendChild(gender);

					document.body.appendChild(div);
				}
			}else {
				console.log("Error " + xhr.status);
			}
		}
	};
	xhr.open("get", url, true);
	xhr.send(null);
}