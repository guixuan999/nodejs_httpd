window.onload = function(){
	document.getElementById("get_dp").addEventListener("click", btn_clicked, false);
	document.getElementById("get_device_image").addEventListener("click", btn_clicked, false);
}

function btn_clicked() {
	var url;
	if(this.id == "get_dp") {
		url = 'http://' + window.location.host + ":9009/devices/" + document.getElementById("device_id").value.trim() + "/datapoints?datastream_id=temperature,illuminance,acceleration";
		
	} else if(this.id == "get_device_image") {
		url = 'http://' + window.location.host + ":9009/mqtt/v1/devices/" + document.getElementById("device_id").value.trim() + "/image";
	}

	axios({
		method: 'get',
		url: url,
		})
		.then(function (response) {
			console.log(response.data);
			var div=document.createElement("div");
			div.style.border = "solid 1px";
			div.innerText = JSON.stringify(response.data/*, null, 2*/);
			document.body.appendChild(div);
		});
}


