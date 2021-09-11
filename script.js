var baseUrl = 'https://api.openweathermap.org/data/2.5/onecall';
var apiKey = '&appid=db0a794ac59eac6a53f36f784e33fb8a';

fetch(baseUrl + apiKey).then(function(response) {
	return response.json();
}).then(function(response){
	console.log(response)
});