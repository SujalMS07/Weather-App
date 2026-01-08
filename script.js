const apiKey = "48f0c5cb4d2940b0b89182704260701";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

searchBtn.addEventListener("click", getWeather);
cityInput.addEventListener("keypress", e => {
    if(e.key === "Enter") getWeather();
});

function getWeather() {
    const city = cityInput.value.trim();
    if(city === "") return alert("Please enter a city name");

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    fetch(url)
    .then(res => res.json())
    .then(data => {
        if(data.error){
            alert("City not found");
            return;
        }

        document.getElementById("city").innerText = `${data.location.name}, ${data.location.country}`;
        document.getElementById("temp").innerText = `${data.current.temp_c}°C`;
        document.getElementById("desc").innerText = data.current.condition.text;
        document.getElementById("humidity").innerText = `Humidity: ${data.current.humidity}%`;
        document.getElementById("wind").innerText = `Wind: ${data.current.wind_kph} km/h`;
        document.getElementById("icon").src = `https:${data.current.condition.icon}`;
    })
    .catch(() => alert("Something went wrong"));
}
