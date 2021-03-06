var request = require("request");
var nanoid = require("nanoid");

const API_EP = 'https://api.dialogflow.com/v1/'
let _api_ep
let _lang
let _access_token;
let _session_id;

const requester = (ep, json, method = 'GET') => {
	return new Promise(function(resolve, reject){
		json.sessionId = _session_id;
		json.v = '20150910';
		json.lang  = _lang

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
					resolve(JSON.parse(body))
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
	// result.fulfillment.messages[].type
	MESSAGE_TYPE : {
		SIMPLE : 0,
		CARD : 1,
		Suggestion : 2
	},
	query: text => {
		return requester("query", {
			query: text
		});
	},
	simpleQuery : (text) => {
		return new Promise(function(resolve, reject){
			return requester("query", {
				query: text
			}).then((result)=>{
				console.log(result)
				let messages = []
				for(let i = 0; i < result.result.fulfillment.messages.length; i++){
					let message = result.result.fulfillment.messages[i]
					message.key = result.id + '_message' + i
					messages.push(message)
				}
				resolve({
					query : result.result.resolvedQuery,
					contexts : result.result.contexts,
					intentName : result.result.metadata.intentName,
					isFallbackIntent : result.result.metadata.isFallbackInten,
					messages : messages
				})
			});
		})
	}
};

const init = (access_token, lang, custom_url) => {
	_access_token = access_token;
	_lang = lang || 'ja'
	_api_ep = custom_url || API_EP
	_session_id = nanoid();
	return SimpleDialogflowClient;
};

module.exports = init;