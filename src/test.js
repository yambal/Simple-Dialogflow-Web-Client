var sd = require("./index.js")(
	"c4202a73a8b147aea7f5fc95546f0cfe",
	"ja",
	"https://cors-anywhere.herokuapp.com/https://api.dialogflow.com/v1/"
);
//var sd = require('./index.js')('c4202a73a8b147aea7f5fc95546f0cfe');

sd.query("やぁ").then(
	result => {
		console.log(result);
		document.getElementById("result").innerText = result;
	},
	error => {
		console.log(error);
	}
);

document.getElementById("send").onclick = function() {
	var v = document.getElementById("input").value;
	sd.query(v).then(
		result => {
			document.getElementById("result").innerText = JSON.stringify(result, null, 2);
		},
		error => {
			console.log(error);
		}
	);
};