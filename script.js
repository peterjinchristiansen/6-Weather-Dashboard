var searchBarEl = document.getElementById('searchBar');
var cityFormEl = document.getElementById('cityForm');
var cityDisplayEl = document.getElementById('cityDisplay');


cityFormEl.onsubmit = submit;

function submit(event) {
	event.preventDefault();
	var api_2 = '&appid=35da9ea72100aa99f12e733919325eb0';
	var api_1 = 'http://api.openweathermap.org/data/2.5/forecast?q=';
	var cityName = searchBarEl.value.trim();
	apiurl = (api_1 + cityName + api_2);

	return fetch(apiurl)
		.then(function(response) {
			return response.json();})
		.then(function(data) {
			console.log(data);
			var city = (data.city.name)
			cityDisplayEl.innerHTML = city;	
		})
}