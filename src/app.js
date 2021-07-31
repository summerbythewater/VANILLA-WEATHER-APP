function displayTemp(response) {
    console.log(response);
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
}

let apiKey = "fdeebaf7e5260bc95803113646d25a38";
let city = "Copenhagen";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemp);