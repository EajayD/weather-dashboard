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
            getForecast(cityName);
            cities.unshift({cityName}); // unshift allows searches to be stacked on top of each other
            cityInput.value = ""; // clear form
        }
        save(); //save to storage
        history(cityName); // call on history function to display history 
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

// global variables for 5 day forecast
var forecast = document.querySelector("#forecast");
var fiveDay = document.querySelector("#fiveday-cards");

function getForecast(cityName){
    var RequestUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + apiKey;
    fetch(RequestUrl)
        .then(function (response) {
            console.log(response)
            return response.json();
        })
        .then(function (data){
            console.log(data);
            displayForecast(data);
        })
}
function displayForecast(weather){

    // clear old data
    fiveDay.textContent = ""
    forecast.textContent = "5-Day Forecast:";

    // for loop for 5 days
    var cards = weather.list;
        for(var i=5; i < cards.length; i=i+8){
       var dailyForecast = cards[i];
        
       console.log(dailyForecast);

       var forecastEl=document.createElement("div");
       forecastEl.classList = "card bg-primary text-light col-2 m-2";

       //display date
       var forecastDate = document.createElement("h5")
       forecastDate.textContent = moment.unix(dailyForecast.dt).format("MMM D, YYYY");
       forecastDate.classList = "card-header text-center"

       
       //pretty icon
       var weatherIcon = document.createElement("img")
       weatherIcon.classList = "card-body text-center";
       weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);  
       forecastEl.appendChild(weatherIcon);
       
       //display temp
       var forecastTemp = document.createElement("span");
       forecastTemp.classList = "card-body text-center";
       forecastTemp.textContent = "Temp: " + dailyForecast.main.temp + " °F";

       // display humidity 
       var forecastHum = document.createElement("span");
       forecastHum.classList = "card-body text-center";
       forecastHum.textContent ="Humidity: " + dailyForecast.main.humidity + "  %";

       // display wind
       var forecastWind = document.createElement("span");
       forecastWind.textContent = "Wind Speed: " + dailyForecast.wind.speed + " MPH";
       forecastWind.classList = "card-body text-center";

       //append to card
       forecastEl.appendChild(forecastDate);
       forecastEl.appendChild(forecastTemp);
       forecastEl.appendChild(forecastHum);
       forecastEl.appendChild(forecastWind)

       //append to container to display as row
        fiveDay.appendChild(forecastEl);
    }

}

// empty array for searches
var cities = [];
var pastSearchButton = document.querySelector("#past-search-buttons");


//local storage set
function save(){
    localStorage.setItem("cities", JSON.stringify(cities));
};


// create button element so that search shows up as a clickable object in order to show its data when clicked
function history(previous){
    city = document.createElement("button");
    city.textContent = previous;
    city.classList = "d-flex w-100 btn-light border p-2";
    city.setAttribute("data-city", previous); 
    city.setAttribute("type", "submit");

    pastSearchButton.prepend(city);
}

// calls on the data previously searched for when function is called
function historySearch(event){
    var prev = event.target.getAttribute("data-city");
    if (prev){
        getData(prev);
        getForecast(prev);
    }
}

pastSearchButton.addEventListener("click", historySearch);