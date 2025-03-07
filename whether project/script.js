const apiKey = "6fa3957476bc4b6cb75170230252701";

document.getElementById("search-button").addEventListener("click", () => {
    const city = document.getElementById("city-input").value;
    if (city) {
        fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`)
            .then(response => response.json())
            .then(dat => updateWeather(dat))
            .catch(error => alert("Error fetching weather data."));
    } else {
        alert("Please enter a city name.");
    }
});

function updateWeather(data) {
    document.getElementById("city").textContent = data.location.name;
    document.getElementById("temp").textContent = `${data.current.temp_c}°c`;
    document.getElementById("humidity").textContent = `${data.current.humidity}%`;
    document.getElementById("wind").textContent = `${data.current.wind_kph}km/h`;
    document.getElementById("weather-icon").src = data.current.condition.icon;
}