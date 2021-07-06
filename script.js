// api key so that I dont have to grab from website
var apiKey = "919c195f22701b891810f8b9f13ce9a9";

var cityForm = document.querySelector("#city-search");
var cityInput = document.querySelector("#city");
var citySearch = document.querySelector("#searched-city");
var weatherCurrent = document.querySelector("#current-weather");

// test to see if data is collected, need to add form/function to make this happen
function getData(cityName) {
    var firstRequestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey;
    fetch(firstRequestUrl)
        .then(function (response) {
            console.log(response)
            return response.json();
        })
        .then(function (data){
            console.log(data, cityName);
            displayWeather(data, cityName);
        })
}

function formSubmit(event){
    event.preventDefault();
    var cityName = cityInput.value.trim();
        if (cityName){
            getData(cityName);
        }
}

cityForm.addEventListener("submit", formSubmit);



function displayWeather(weather, cityInput){

    // clear contents of old data
    weatherCurrent.textContent= "";  
    citySearch.textContent = cityInput;
 
    console.log(weather);
 
    //create date element using moment js
    var currentDate = document.createElement("span")
    currentDate.textContent=" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
    citySearch.appendChild(currentDate);
 
    //icon for forecast cards
    var weatherIcon = document.createElement("img")
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    citySearch.appendChild(weatherIcon);
 
    //displays the temperature 
    var temperature = document.createElement("span");
    temperature.textContent = "Temperature: " + weather.main.temp + " °F";
    temperature.classList = "list-group-item"
   
    //displays humidity
    var humidity = document.createElement("span");
    humidity.textContent = "Humidity: " + weather.main.humidity + " %";
    humidity.classList = "list-group-item"
 
    //displays wind
    var windSpeed = document.createElement("span");
    windSpeed.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
    windSpeed.classList = "list-group-item"
 
    //append to container
    weatherCurrent.appendChild(temperature);
    weatherCurrent.appendChild(humidity);
    weatherCurrent.appendChild(windSpeed);
}