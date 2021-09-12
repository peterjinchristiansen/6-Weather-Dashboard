if(localStorage.getItem("searchHistory") === null) {
	var arr = [];
} else {
	var arr = JSON.parse(localStorage.getItem("searchHistory"));
}

var historyButtonEl = document.getElementById('outline-history');
var searchBarEl = document.getElementById('searchBar');
var cityFormEl = document.getElementById('cityForm');
var cityDisplayEl = document.getElementById('cityDisplay');
var historyArea = document.getElementById('outline-history');


createButtonForHistory();



document.getElementById('clearHistory').onclick = clearHistoryFunction;

cityFormEl.onsubmit = submit;



function submit(event) {
	event.preventDefault();
	var cityName = searchBarEl.value.trim();
	submitPartTwo(cityName);
}


function submitPartTwo(cityName) {

	var api_1 = 'https://api.openweathermap.org/data/2.5/forecast?q=';
	var api_2 = '&appid=35da9ea72100aa99f12e733919325eb0';




	apiurl = (api_1 + cityName + api_2);

	var baseAPI = "https://api.openweathermap.org/data/2.5/onecall?lat=";
	var baseAPI2 = "&lon="
	var baseAPI3 = "&units=imperial&appid=35da9ea72100aa99f12e733919325eb0"

	return fetch(apiurl)
		.then(function(response) {
			return response.json();})
		.then(function(data) {
			var lattitude = (data.city.coord.lat);
			var longitude = (data.city.coord.lon);
			var apiurl2 = (baseAPI + lattitude + baseAPI2 + longitude + baseAPI3);
			cityName = data.city.name;
			arr.push(cityName);
			pushNewButtonToHistory(cityName);
			localStorage.setItem("searchHistory", JSON.stringify(arr));
			newFunction(apiurl2, cityName);
		})
		
}

function newFunction(apiurl2) {
	var forecastDisplayEl = document.querySelector('#dayByDay');
	forecastDisplayEl.innerHTML = "";

	return fetch(apiurl2)
		.then(function(response) {
			return response.json();})
		.then(function(data) {
			console.log(data);
			var unix = (data.current.dt) * 1000;
			var dateObject = new Date(unix);
			var month = dateObject.toLocaleString("en-US", {month: "long"});
			var day = dateObject.toLocaleString("en-US", {day: "numeric"});
			var year = dateObject.toLocaleString("en-US", {year: "numeric"});

			var todaysDate = document.getElementById("cityDisplay");
			var temperature = document.getElementById("tempDisplay");
			var windSpeed = document.getElementById("windDisplay");
			var humidity = document.getElementById("humidityDisplay");
			var UVI = document.querySelector(".uvText");
			var UVI2 = document.querySelector(".uvColor");
			var weatherIcon = data.current.weather[0].icon;
			var picture = document.createElement("img");

			iconFunction(weatherIcon, picture);

			todaysDate.innerHTML = month + " " + day +  ", " + year + "   " + "<div id='iconDiv'></div>";
			var iconEl = document.querySelector('#iconDiv');
			iconEl.appendChild(picture);
			temperature.innerHTML = "Temp: " + data.current.temp + "\xB0 F";
			windSpeed.innerHTML = "Wind: " + data.current.wind_speed + " MPH";
			humidity.innerHTML = "Humidity: " + data.current.humidity + " %";
			UVI.innerHTML = "UVI: ";
			UVI2.innerHTML = data.current.uvi;

			if(data.current.uvi < 2) {
				UVI2.setAttribute('id', 'uviLow');
			} else if (data.current.uvi < 7) {
				UVI2.setAttribute('id', 'uviMod');
			} else {
				UVI2.setAttribute('id', 'uviHigh');
			}

			for(i = 1; i < 6; i++) {

				var unixFC = (data.daily[i].dt) * 1000;
				var dateObjectFC = new Date(unixFC);
				var monthFC = dateObjectFC.toLocaleString("en-US", {month: "long"});
				var dayFC = dateObjectFC.toLocaleString("en-US", {day: "numeric"});
				var yearFC= dateObjectFC.toLocaleString("en-US", {year: "numeric"});

				var forecastDisplayEl = document.querySelector('#dayByDay');
				var createForecast = document.createElement("div");



				var forecastDate = document.createElement("h3");
				var picture = document.createElement("img");
				var forecastTempLow = document.createElement("p");
				var forecastTempHigh = document.createElement("p");
				var forecastWindSpeed = document.createElement("p");
				var forecastHumidity = document.createElement("p");
				var weatherIcon = data.daily[i].weather[0].icon;

				iconFunction(weatherIcon, picture);

				forecastDate.innerHTML = monthFC + " " + dayFC +  ", " + yearFC;
				forecastTempLow.innerHTML = "Low: " + data.daily[i].temp.min + "\xB0 F";
				forecastTempHigh.innerHTML = "High: " + data.daily[i].temp.max + "\xB0 F";
				forecastWindSpeed.innerHTML = "Wind: " + data.daily[i].wind_speed + " MPH";
				forecastHumidity.innerHTML = "Humidity: " + data.daily[i].humidity + " %";
		
				forecastDate.setAttribute('class', 'forecastHeading');
				picture.setAttribute('class', 'forecastImage');
				forecastTempLow.setAttribute('class', 'forecastParagraph');
				forecastTempHigh.setAttribute('class', 'forecastParagraph');
				forecastWindSpeed.setAttribute('class', 'forecastParagraph');
				forecastHumidity.setAttribute('class', 'forecastParagraph');
				createForecast.setAttribute('class', 'forecastDiv');

				forecastDisplayEl.appendChild(createForecast);
				createForecast.appendChild(forecastDate);
				createForecast.appendChild(picture);
				createForecast.appendChild(forecastTempLow);
				createForecast.appendChild(forecastTempHigh);
				createForecast.appendChild(forecastWindSpeed);
				createForecast.appendChild(forecastHumidity);
				



			}
		})
}

function iconFunction(weatherIcon, picture) {
	var slicedWeatherIcon = weatherIcon.slice(0, -1);
	if(slicedWeatherIcon == "01") {
		picture.setAttribute("src", "./images/01d@2x.png");
	} else if(slicedWeatherIcon == "02") {
		picture.setAttribute("src", "./images/02d@2x.png");
	} else if(slicedWeatherIcon == "03") {
		picture.setAttribute("src", "./images/03d@2x.png");
	} else if(slicedWeatherIcon == "04") {
		picture.setAttribute("src", "./images/04d@2x.png");
	} else if(slicedWeatherIcon == "09") {
		picture.setAttribute("src", "./images/09d@2x.png");
	} else if(slicedWeatherIcon == "10") {
		picture.setAttribute("src", "./images/10d@2x.png");
	} else if(slicedWeatherIcon == "11") {
		picture.setAttribute("src", "./images/11d@2x.png");
	} else if(slicedWeatherIcon == "13") {
		picture.setAttribute("src", "./images/13d@2x.png");
	} else if(slicedWeatherIcon == "50") {
		picture.setAttribute("src", "./images/50d@2x.png");
	}
}

function createButtonForHistory() {

	for(i = 0; i < arr.length; i++) {
		var createButton = document.createElement('button');
		createButton.innerHTML = arr[i];
		createButton.onclick = fromHistory;
		createButton.classList.add('thisIsMyHistory');
		historyButtonEl.appendChild(createButton);
	}
}

function clearHistoryFunction() {
	localStorage.clear();
	historyArea.innerHTML = "";
	arr = [];
}

function pushNewButtonToHistory(cityName) {
	var createButton = document.createElement('button');
	createButton.innerHTML = cityName;
	createButton.onclick = fromHistory;
	createButton.classList.add('thisIsMyHistory');
	historyButtonEl.appendChild(createButton);
}

function fromHistory() {

	var cityName = this.textContent;
	submitPartTwo(cityName);
}