const btn = document.querySelector(".hamburger");
const list = document.querySelector(".nav-list");

btn.addEventListener("click", navToggle);

function navToggle() {
  btn.classList.toggle("open");
  list.classList.toggle("flex");
  list.classList.toggle("hidden");
}

// =====================================================

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

// Tabs menu event listener
tabs.forEach((tab) => tab.addEventListener("click", onTabClick));

// Hamburger button listener
// btn.addEventListener("click", navToggle);

function onTabClick(e) {
  // Deactivate all tabs
  tabs.forEach((tab) => {
    tab.children[0].classList.remove(
      "border-lightBlue",
      "border-b-4",
      "md:border-b-0"
    );
  });

  // Hide all panels
  panels.forEach((panel) => panel.classList.add("hidden"));

  // Activate a new tab and panel based on the target
  e.target.classList.add("border-lightBlue", "border-b-4");
  const classString = e.target.getAttribute("data-target");
  document
    .getElementById("panels")
    .getElementsByClassName(classString)[0]
    .classList.remove("hidden");
}

// -----------------------------------For features---------------------------------
const slider = document.querySelectorAll(".tabs");
const box = document.querySelectorAll(".panels");

// Tabs menu event listener
slider.forEach((tabs) => tabs.addEventListener("click", onClick));

function onClick(e) {
  // Deactivate all tabs
  slider.forEach((tabs) => {
    tabs.children[0].classList.remove(
      "border-lightBlue",
      "border-b-4",
      "md:border-b-0"
    );
  });

  // Hide all panels
  box.forEach((panels) => panels.classList.add("hidden"));

  // Activate a new tab and panel based on the target
  e.target.classList.add("border-lightBlue", "border-b-4");
  const classStr = e.target.getAttribute("data-target");
  document
    .getElementById("box")
    .getElementsByClassName(classStr)[0]
    .classList.remove("hidden");
}

// Weather API=====================================================================

const searchBox = document.querySelector(".search");
const searchBtn = document.querySelector(".btn");
const imgBox = document.querySelector(".img");

const apiKey = "1258b95ec12041c5856171928231505";
const apiUrl =
  "http://api.weatherapi.com/v1/current.json?key=1258b95ec12041c5856171928231505&q=";

const forecastUrl =
  "http://api.weatherapi.com/v1/forecast.json?key=1258b95ec12041c5856171928231505&days=4&q=";

const searchUrl =
  "http://api.weatherapi.com/v1/search.json?key=1258b95ec12041c5856171928231505&q=";

const historyUrl =
  "http://api.weatherapi.com/v1/history.json?key=1258b95ec12041c5856171928231505&q=";

// ---------------------------------------------Date fetching----------------------------

// -------------------------------------------------------------------------

async function checkWeather(city) {
  const response = await fetch(apiUrl + city);
  var data = await response.json();

  const resForecast = await fetch(forecastUrl + city);
  var forecastData = await resForecast.json();

  console.log(forecastData);

  document.querySelector(".city").innerText = data.location.name;
  document.querySelector(".temp").innerText = data.current.temp_c;
  document.querySelector(".feelsLikeTemp").innerText = data.current.feelslike_c;
  document.querySelector(".condition").innerText = data.current.condition.text;
  document.querySelector(".humidity").innerText = data.current.humidity;
  document.querySelector(".pressure").innerText = data.current.pressure_mb;
  document.querySelector(".wind").innerText = data.current.wind_kph;
  document.querySelector(".visibility").innerText = data.current.vis_km;
  document.querySelector(".uv").innerText = data.current.uv;
  imgBox.src = data.current.condition.icon;

  const lt = data.location.lat;

  const lng = data.location.lon;
  console.log(lt, lng);
  marker.setLatLng([lt, lng]).update();
  map.setView([lt, lng], 13);

  // Forecast for hourly

  for (let i = 0; i <= 23; i++) {
    document.querySelector(`.dateHour${i}`).innerText =
      forecastData.forecast.forecastday[0].hour[i].time;
    document.querySelector(`.tempHour${i}`).innerText =
      forecastData.forecast.forecastday[0].hour[i].temp_c;
    document.querySelector(`.imgHour${i}`).src =
      forecastData.forecast.forecastday[0].hour[i].condition.icon;
  }

  const t = forecastData.forecast.forecastday[0].hour[1].temp_c;
  console.log(t);

  // Forecast for 3days

  for (let i = 1; i <= 3; i++) {
    document.querySelector(`.dateFore${i}`).innerText =
      forecastData.forecast.forecastday[i].date;
    document.querySelector(`.tempFore${i}`).innerText =
      forecastData.forecast.forecastday[i].day.maxtemp_c;
    document.querySelector(`.imgFore${i}`).src =
      forecastData.forecast.forecastday[i].day.condition.icon;
  }
}

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const city = searchBox.value;
  console.log(city);
  checkWeather(city);

  submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const selectDate = document.getElementById("dob").value;
    console.log("Date", selectDate);
    getHistoryData(city, selectDate);
  });
});

//searchBtn.addEventListener("click", checkWeather);

// ==================================================================================================================
// Map
const map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// L.marker([51.5, -0.09])
//   .addTo(map)
//   .bindPopup("A pretty CSS popup.<br> Easily customizable.")
//   .openPopup();

const marker = L.marker([0, 0]).addTo(map);

// navigator.geolocation.getCurrentPosition(function (pos) {
//   const lat = pos.coords.latitude;
//   const long = pos.coords.longitude;

//   console.log(lat, long);
//   marker.setLatLng([lat, long]).update();
//   map.setView([lat, long], 13);
// });

// ===================================================================================================================

async function fetchText(lat, long) {
  // let url = "https://ipinfo.io/json?token=a2ad1ff7867b44";
  // let r = await fetch(url);
  // let d = await r.json();
  // const location = d.city;
  // console.log(location);

  const alt = lat;
  const ln = long;
  console.log("Show", alt, ln);

  const search = await fetch(searchUrl + alt.toString() + "," + ln.toString());
  var cityData = await search.json();

  const cityName = cityData[0].name;

  console.log(cityName);

  const response = await fetch(apiUrl + cityName);
  var data = await response.json();

  const res = await fetch(forecastUrl + cityName);
  var forecastData = await res.json();
  console.log(forecastData);

  document.querySelector(".city").innerText = data.location.name;
  document.querySelector(".temp").innerText = data.current.temp_c;
  document.querySelector(".feelsLikeTemp").innerText = data.current.feelslike_c;
  document.querySelector(".condition").innerText = data.current.condition.text;
  document.querySelector(".humidity").innerText = data.current.humidity;
  document.querySelector(".pressure").innerText = data.current.pressure_mb;
  document.querySelector(".wind").innerText = data.current.wind_kph;
  document.querySelector(".visibility").innerText = data.current.vis_km;
  document.querySelector(".uv").innerText = data.current.uv;
  imgBox.src = data.current.condition.icon;

  const lt = data.location.lat;

  const lng = data.location.lon;
  console.log(lt, lng);
  marker.setLatLng([lt, lng]).update();
  map.setView([lt, lng], 13);

  // Forecast for hourly

  for (let i = 0; i <= 23; i++) {
    document.querySelector(`.dateHour${i}`).innerText =
      forecastData.forecast.forecastday[0].hour[i].time;
    document.querySelector(`.tempHour${i}`).innerText =
      forecastData.forecast.forecastday[0].hour[i].temp_c;
    document.querySelector(`.imgHour${i}`).src =
      forecastData.forecast.forecastday[0].hour[i].condition.icon;
  }

  const t = forecastData.forecast.forecastday[0].hour[1].temp_c;
  console.log(t);

  // Forecast for 3days

  for (let i = 1; i <= 3; i++) {
    document.querySelector(`.dateFore${i}`).innerText =
      forecastData.forecast.forecastday[i].date;
    document.querySelector(`.tempFore${i}`).innerText =
      forecastData.forecast.forecastday[i].day.maxtemp_c;
    document.querySelector(`.imgFore${i}`).src =
      forecastData.forecast.forecastday[i].day.condition.icon;
  }
}

navigator.geolocation.getCurrentPosition(function (pos) {
  const lat = pos.coords.latitude;
  const long = pos.coords.longitude;

  console.log(lat, long);
  fetchText(lat, long);
});

// Calender===========================================================================================================

let date = new Date();
let month = date.getMonth() + 1;
let year = date.getUTCFullYear();
let pastDate = date.getDate() - 5;
let currentDate = date.getDate() - 1;

if (month < 10) {
  month = "0" + month;
}
if (pastDate < 10) {
  pastDate = "0" + pastDate;
}

let minDate = year + "-" + month + "-" + pastDate;
let maxDate = year + "-" + month + "-" + currentDate;
console.log("min", minDate);
console.log("max", maxDate);
document.getElementById("dob").setAttribute("min", minDate);
document.getElementById("dob").setAttribute("max", maxDate);

// function viewdate() {
//   const selectDate = document.getElementById("dob").value;
//   console.log("Date", selectDate);
// }

const submitBtn = document.querySelector(".subButton");

async function getHistoryData(city, selectDate) {
  console.log("in his", city, selectDate);

  const resHistory = await fetch(
    historyUrl + city + "&dt=" + selectDate.toString()
  );
  var historyData = await resHistory.json();

  console.log(historyData);
  console.log(historyData.forecast.forecastday[0].date);

  document.querySelector(".dateHistory").innerText =
    historyData.forecast.forecastday[0].date;
  document.querySelector(".tempHistory").innerText =
    historyData.forecast.forecastday[0].day.maxtemp_c;
  document.querySelector(".imgHistory").src =
    historyData.forecast.forecastday[0].day.condition.icon;

  const li = document.querySelector(".historyList");
  li.classList.toggle("hidden");
}
