var request = require("request");
var nanoid = require("nanoid");

const API_EP = 'https://api.dialogflow.com/v1/'
let _api_ep
let _access_token;
let _session_id;

const requester = (ep, json, method = 'GET') => {
	return new Promise(function(resolve, reject){
		json.sessionId = _session_id;
		json.v = '20150910';
		if(method.toLowerCase() == 'get'){
			request(
				{
					url :_api_ep + ep,
					method: "GET",
					headers: {
						Authorization: "Bearer " + _access_token
					},
					qs : json
				},
				function(error, response, body) {
					if(error){
						reject(error)
						return
					}
					resolve(body)
				}
			)
		}
	})

	/*
	request(
		{
			url: "https://api.api.ai/v1/" + ep + "?v=20150910",
			method: "POST",
			headers: {
				Authorization: "Bearer " + _access_token,
				contentType: "application/json;charset=utf-8"
			},
			json: json
		},
		function(error, response, body) {
			//console.log(error)
			//console.log(response)
			console.log(body);
		}
	);
	*/
};

const SimpleDialogflowClient = {
	query: text => {
		return requester("query", {
			query: text,
			lang: "ja"
		});
	}
};

const init = (access_token, custom_url) => {
	_api_ep = custom_url || API_EP
	_session_id = nanoid();
	_access_token = access_token;
	return SimpleDialogflowClient;
};

module.exports = init;