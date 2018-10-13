var sd = require('./index.js')('c4202a73a8b147aea7f5fc95546f0cfe', 'https://cors-anywhere.herokuapp.com/https://api.dialogflow.com/v1/');
//var sd = require('./index.js')('c4202a73a8b147aea7f5fc95546f0cfe');

sd.query('やぁ').then((result) => {
	console.log(result)
}, (error)=>{
	console.log(error)
})