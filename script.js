// api key so that I dont have to grab from website
var apiKey = "919c195f22701b891810f8b9f13ce9a9"

// test to see if data is collected, need to add form/function to make this happen
function getData(cityName) {
    var firstRequestUrl = "api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

    fetch(firstRequestUrl)
        .then(function (response) {
            console.log(response)
            return response.json();
        })
        .then(function (data){
            console.log(data)
        })
}