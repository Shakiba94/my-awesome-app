function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#box");

  let h2 = document.querySelector("#cityName");
  h2.innerHTML = `${searchInput.value}`;
  searchCity(searchInput.value);
}
function searchCity(city) {
  let apiKey = "6f97c15cf8e7224067c7d49c6df74784";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let now = new Date();
let h1 = document.querySelector("#whichDay");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

h1.innerHTML = `${day} , ${hours}:${minutes} `;

function showTemperature(response) {
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = `It is ${temperature}°C in ${city}`;
  let description = document.querySelector("#sunny");
  description.innerHTML = response.data.weather[0].description;
}

function showPosition(position) {
  let h2 = document.querySelector("#cityName");
  h2.innerHTML = `${position.coords.latitude} ${position.coords.longitude}`;
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-button");
button.addEventListener("click", getCurrentPosition);
