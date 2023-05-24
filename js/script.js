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

navigator.geolocation.getCurrentPosition(function (pos) {
  const lat = pos.coords.latitude;
  const long = pos.coords.longitude;
  marker.setLatLng([lat, long]).update();
  map.setView([lat, long], 13);
});

// ===================================================================================================================

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
btn.addEventListener("click", navToggle);

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

// Weather API

const apiKey = "1258b95ec12041c5856171928231505";
const apiUrl =
  "http://api.weatherapi.com/v1/current.json?key=1258b95ec12041c5856171928231505&q=";

const searchBox = document.querySelector(".search");
const searchBtn = document.querySelector(".btn");
const imgBox = document.querySelector(".img");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city);
  var data = await response.json();
  console.log(data);

  document.querySelector(".city").innerText = data.location.name;
  document.querySelector(".temp").innerText = data.current.temp_c;
  document.querySelector(".condition").innerText = data.current.condition.text;
  document.querySelector(".humidity").innerText = data.current.humidity;
  imgBox.src = data.current.condition.icon;
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
