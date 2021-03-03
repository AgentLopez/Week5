
const yourZipCode = document.getElementById("yourZipCode")
const letsTalkWeather = document.getElementById("letsTalkWeather")

const weatherSpot = document.getElementById("weatherSpot")

letsTalkWeather.addEventListener('click', function () {
    event.preventDefault()
    let zip = yourZipCode.value
    let weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${zip}&units=imperial&appid=12c5273402c3d535389896c9e3e718c9`

    fetch(weatherURL)
    .then ((response) => {
        return response.json()
    })
    .then ((weather) => {
        showWeather(weather)
    })

})

function showWeather(currentWeather) {
    weatherSpot.innerHTML = `
    <h1>At Home in ${currentWeather.name}</h1>
    <h2>The Temp is ${currentWeather.main.temp}</h2>
    <h3>It's ${currentWeather.weather[0].main}, with pressure of ${currentWeather.main.pressure}</h3>
    <h4>Today's High is ${currentWeather.main.temp_max}, Low of ${currentWeather.main.temp_min}</h4>
    `
}

function geoFindMe() {

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        fetch(`http://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}&cnt=1&units=imperial&appid=12c5273402c3d535389896c9e3e718c9`)
        .then((response) => {
            return response.json()
        })
        .then((weather) => {
            showWeather(weather.list[0])
        })
    }

    function error() {
        console.log('Unable to retrieve your location')
    }

    if (!navigator.geolocation) {
        console.log('Geolocation is not supported by your browser')
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }

}

geoFindMe()