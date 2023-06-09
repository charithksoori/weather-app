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

tabs.forEach((tab) => tab.addEventListener("click", onTabClick));

function onTabClick(e) {
  tabs.forEach((tab) => {
    tab.children[0].classList.remove(
      "border-lightBlue",
      "border-b-4",
      "md:border-b-0"
    );
  });

  panels.forEach((panel) => panel.classList.add("hidden"));

  e.target.classList.add("border-lightBlue", "border-b-4");
  const classString = e.target.getAttribute("data-target");
  document
    .getElementById("panels")
    .getElementsByClassName(classString)[0]
    .classList.remove("hidden");
}

// ==================================================================================================================
//                                                   For features
// ==================================================================================================================

const slider = document.querySelectorAll(".tabs");
const box = document.querySelectorAll(".panels");

slider.forEach((tabs) => tabs.addEventListener("click", onClick));

function onClick(e) {
  slider.forEach((tabs) => {
    tabs.children[0].classList.remove(
      "border-lightBlue",
      "border-b-4",
      "md:border-b-0"
    );
  });

  box.forEach((panels) => panels.classList.add("hidden"));

  e.target.classList.add("border-lightBlue", "border-b-4");
  const classStr = e.target.getAttribute("data-target");
  document
    .getElementById("box")
    .getElementsByClassName(classStr)[0]
    .classList.remove("hidden");
}

// ==================================================================================================================
//                                                      Weather API
// ==================================================================================================================
const searchBox = document.querySelector(".search");
const searchBtn = document.querySelector(".btn");
const imgBox = document.querySelector(".img");
const submitBtn = document.querySelector(".subButton");

let city;

const apiKey = "1258b95ec12041c5856171928231505";
const apiUrl =
  "https://api.weatherapi.com/v1/current.json?key=1258b95ec12041c5856171928231505&q=";

const forecastUrl =
  "https://api.weatherapi.com/v1/forecast.json?key=1258b95ec12041c5856171928231505&days=3&q=";

const searchUrl =
  "https://api.weatherapi.com/v1/search.json?key=1258b95ec12041c5856171928231505&q=";

const historyUrl =
  "https://api.weatherapi.com/v1/history.json?key=1258b95ec12041c5856171928231505&q=";

// ==================================================================================================================
//                                                      Map
// ==================================================================================================================
const map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const marker = L.marker([0, 0]).addTo(map);

// ==================================================================================================================
//                                                     Current Location
// ==================================================================================================================
window.addEventListener("DOMContentLoaded", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const long = pos.coords.longitude;
        console.log(lat, long);
        fetchText(lat, long);
      },
      (err) => {
        alert("Geolocation is not supported by your browser");
        city = "colombo";
        checkWeather(city);
        console.log(err.message);
      }
    );
  } else {
    alert("Geolocation is not supported by your browser");
  }
});

async function fetchText(lat, long) {
  const alt = lat;
  const ln = long;
  console.log("Show", alt, ln);

  const search = await fetch(searchUrl + alt.toString() + "," + ln.toString());
  const cityData = await search.json();

  city = cityData[0].name;

  console.log(city);
  checkWeather(city);
}

// ==================================================================================================================
//                                     Display search weather conditions & Forecast
// ==================================================================================================================

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city);
    console.log(response);

    if (!response.ok) {
      throw new Error("Enter a valid city name");
    }

    // if (response.status == 400) {
    //   document.querySelector(".error").style.display = "block";
    //   throw new Error("Enter a valid city name");
    // } else {
    document.querySelector(".error").style.display = "none";
    const data = await response.json();

    const resForecast = await fetch(forecastUrl + city);
    const forecastData = await resForecast.json();

    console.log(forecastData);

    document.querySelector(".city").innerText = data.location.name;
    document.querySelector(".temp").innerText = Math.round(data.current.temp_c);
    document.querySelector(".feelsLikeTemp").innerText = Math.round(
      data.current.feelslike_c
    );
    document.querySelector(".condition").innerText =
      data.current.condition.text;
    document.querySelector(".humidity").innerText = data.current.humidity;
    document.querySelector(".pressure").innerText = data.current.pressure_mb;
    document.querySelector(".wind").innerText = Math.round(
      data.current.wind_kph
    );
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
      document.querySelector(`.tempHour${i}`).innerText = Math.round(
        forecastData.forecast.forecastday[0].hour[i].temp_c
      );
      document.querySelector(`.imgHour${i}`).src =
        forecastData.forecast.forecastday[0].hour[i].condition.icon;
    }

    const t = forecastData.forecast.forecastday[0].hour[1].temp_c;
    console.log(t);

    // for (const item of forecastData.forecast.forecastday) {
    //   console.log(item);
    // }
    // Forecast for 3days

    for (let i = 0; i < 3; i++) {
      document.querySelector(`.dateFore${i}`).innerText =
        forecastData.forecast.forecastday[i].date;
      document.querySelector(`.tempFore${i}`).innerText = Math.round(
        forecastData.forecast.forecastday[i].day.avgtemp_c
      );
      document.querySelector(`.conFore${i}`).innerText =
        forecastData.forecast.forecastday[i].day.condition.text;
      document.querySelector(`.imgFore${i}`).src =
        forecastData.forecast.forecastday[i].day.condition.icon;
      // -------------------------
      document.querySelector(`.riseFore${i}`).innerText =
        forecastData.forecast.forecastday[i].astro.sunrise;
      document.querySelector(`.setFore${i}`).innerText =
        forecastData.forecast.forecastday[i].astro.sunset;
      document.querySelector(`.maxtempFore${i}`).innerText = Math.round(
        forecastData.forecast.forecastday[i].day.maxtemp_c
      );
      document.querySelector(`.mintempFore${i}`).innerText = Math.round(
        forecastData.forecast.forecastday[i].day.mintemp_c
      );
      document.querySelector(`.humFore${i}`).innerText = Math.round(
        forecastData.forecast.forecastday[i].day.avghumidity
      );
      document.querySelector(`.corFore${i}`).innerText =
        forecastData.forecast.forecastday[i].day.daily_chance_of_rain;
      document.querySelector(`.cosFore${i}`).innerText =
        forecastData.forecast.forecastday[i].day.daily_chance_of_snow;
    }
    searchBox.value = "";
  } catch (error) {
    console.log(error);
    document.querySelector(".error").style.display = "block";
    searchBox.value = "";
  }
}

// --------------------------------------------------------------------

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  city = searchBox.value;
  console.log(city);
  checkWeather(city);

  li.classList.add("hidden");
});

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const selectDate = document.getElementById("dob").value;
  console.log("Date", selectDate);
  getHistoryData(city, selectDate);
});

// Calender===========for Weather History================================================================================================

// let date = new Date();
// let month = date.getMonth() + 1;
// let year = date.getUTCFullYear();
// let pastDate = date.getDate()-;
// let currentDate = date.getDate();

// console.log("past date", pastDate);
// console.log("current date", currentDate);

// if (month < 10) {
//   month = "0" + month;
// }

// if (pastDate < 10) {
//   pastDate = "0" + pastDate;
// }

// if (currentDate < 10) {
//   currentDate = "0" + currentDate;
// }

// console.log(currentDate);

// let minDate = year + "-" + month + "-" + pastDate;
// let maxDate = year + "-" + month + "-" + currentDate;

// console.log("min", minDate);
// console.log("max", maxDate);
// document.getElementById("dob").setAttribute("min", minDate);
// document.getElementById("dob").setAttribute("max", maxDate);

const li = document.querySelector(".historyList");

async function getHistoryData(city, selectDate) {
  try {
    console.log("in history", city, selectDate);

    const resHistory = await fetch(
      historyUrl + city + "&dt=" + selectDate.toString()
    );
    const historyData = await resHistory.json();

    console.log(historyData);
    console.log(historyData.forecast.forecastday[0].date);

    document.querySelector(".dateHistory").innerText =
      historyData.forecast.forecastday[0].date;
    document.querySelector(".tempHistory").innerText = Math.round(
      historyData.forecast.forecastday[0].day.avgtemp_c
    );
    document.querySelector(".maxtempHistory").innerText = Math.round(
      historyData.forecast.forecastday[0].day.maxtemp_c
    );
    document.querySelector(".mintempHistory").innerText = Math.round(
      historyData.forecast.forecastday[0].day.mintemp_c
    );
    document.querySelector(".humHistory").innerText = Math.round(
      historyData.forecast.forecastday[0].day.avghumidity
    );
    document.querySelector(".imgHistory").src =
      historyData.forecast.forecastday[0].day.condition.icon;
    document.querySelector(".conHistory").innerText =
      historyData.forecast.forecastday[0].day.condition.text;
    document.querySelector(".riseHistory").innerText =
      historyData.forecast.forecastday[0].astro.sunrise;
    document.querySelector(".setHistory").innerText =
      historyData.forecast.forecastday[0].astro.sunset;

    li.classList.remove("hidden");
    document.querySelector(".historyError").style.display = "none";
  } catch (error) {
    li.classList.add("hidden");
    document.querySelector(".historyError").style.display = "block";
    console.log("Historical data: ", error);
  }
}

// =======================Dark Mode=========================================================

const themeToggleBtn = document.getElementById("theme-toggle");
const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
const themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");

if (
  localStorage.getItem("color-theme") === "dark" ||
  (!("color-theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  // Show light icon
  themeToggleLightIcon.classList.remove("hidden");
} else {
  themeToggleDarkIcon.classList.remove("hidden");
}

// Listen for toggle button click
themeToggleBtn.addEventListener("click", toggleMode);

function toggleMode() {
  // Toggle icon
  themeToggleDarkIcon.classList.toggle("hidden");
  themeToggleLightIcon.classList.toggle("hidden");

  // If is set in localstorage
  if (localStorage.getItem("color-theme")) {
    // If light, make dark and save in localstorage
    if (localStorage.getItem("color-theme") === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    }
  } else {
    // If not in localstorage
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }
  }
}

// =============================Forecast Tabs=============================================

const about = document.querySelector(".about");
const btns = document.querySelectorAll(".tab-button");
const articles = document.querySelectorAll(".contentBox");
about.addEventListener("click", function (e) {
  const id = e.target.dataset.id;
  if (id) {
    // remove selected from other buttons
    btns.forEach(function (btn) {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");
    // hide other articles
    articles.forEach(function (article) {
      article.classList.remove("active");
    });
    const element = document.getElementById(id);
    element.classList.add("active");
  }
});
