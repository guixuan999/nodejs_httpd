window.onload = function(){
	document.getElementById("get_dp").addEventListener("click", btn_clicked, false);
}

function btn_clicked() {
	var url = 'http://' + window.location.host + ":9009/devices/1014870046/datapoints?datastream_id=illuminance,acceleration&start=2022-12-09T15:29:55"
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


