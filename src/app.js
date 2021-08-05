function formatDate(timestamp) {
let date = new Date(timestamp);
let hours = date.getHours();
if (hours < 10) {
    hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
}
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[date.getDay()];
    return `${day}, ${hours}:${minutes}`;

}

function getForecast(coordinates) {
    let apiKey = "fdeebaf7e5260bc95803113646d25a38";
    let lat = coordinates.lat;
    let lon = coordinates.lon;
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&unit=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    return days[day];
}

function displayForecast(response) {
    console.log(response);
    let forecast = response.data.daily; 
    let forecastElement = document.querySelector("#forecast");

    let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
      if (index < 4)
    forecastHTML =
      forecastHTML +
      `
      <div class="col-3">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" width ="40" alt="">
        <div class="weather-forecast-temps">
          <span class="temp-min">${Math.round(forecastDay.temp.min)}°</span> / 
          <span class="temp-max">${Math.round(forecastDay.temp.max)}°</span>
        </div>
      </div>
  `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}



function displayTemp(response) {
    
    let tempElement = document.querySelector("#big-temp");
    tempElement.innerHTML = Math.round(response.data.main.temp);
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.name;
    let countryElement = document.querySelector("#country");
    countryElement.innerHTML = response.data.sys.country;
    let weatherElement = document.querySelector("#weather-condition");
    weatherElement.innerHTML = response.data.weather[0].description;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.main.humidity;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);
    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

    celTemp = response.data.main.temp;

    getForecast(response.data.coord);
}

function search(city) {
let apiKey = "fdeebaf7e5260bc95803113646d25a38";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemp);
}

function handleSubmit(event) {
event.preventDefault();
let cityInputElement = document.querySelector("#city-input");
search(cityInputElement.value);
}



let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function displayFahrTemp(event) {
    event.preventDefault();
    let fahrTemp = Math.round(celTemp * 9/5 + 32);
    let tempElement = document.querySelector("#big-temp");
    tempElement.innerHTML = fahrTemp;
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrTemp);

function displayCelTemp(event) {
event.preventDefault();
let tempElement = document.querySelector("#big-temp");
tempElement.innerHTML = Math.round(celTemp);
}

let celTemp = null;
let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", displayCelTemp);


search("Copenhagen");
