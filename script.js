function initMap() {
    const searchElement = document.getElementById("searchBox");
    const searchBox = new google.maps.places.SearchBox(searchElement);
    searchBox.addListener("places_changed", () => {
        const place = searchBox.getPlaces()[0];
        if (place == null) return
        const latitude = place.geometry.location.lat();
        const longitude = place.geometry.location.lng();
        const proxy = `https://cors-anywhere.herokuapp.com/`
        const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=f9ca789169d967eac2bc191ca630ca88`
        fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                setWeatherData(data , place.formatted_address)
            });
    
    });
    const icon = new Skycons({color: "pink"});
    const todaysDate = document.querySelector("[data-date]");
    const location = document.querySelector("[data-location]");
    const tempEle = document.querySelector("[data-Temp]");
    const humidity = document.querySelector("[data-Humidity]");
    const wind = document.querySelector("[data-Wind]");
    const uVindex = document.querySelector("[data-UVindex]");
    const summary = document.querySelector("[data-summary]")
    
   function setWeatherData(data,place){
    todaysDate.textContent = moment.unix(data.current.dt).format('MMMM Do YYYY, h:mm:ss A');
    location.textContent = place
    tempEle.textContent = data.current.temp
    humidity.textContent = data.current.humidity
    wind.textContent = data.current.wind_speed
    uVindex.textContent = data.current.uvi
    summary.textContent = data.current.weather[0].description
    console.log(data.current.weather[0].main);

    switch (data.current.weather[0].main) {
        case "Clouds":
        icon.add("Icon", Skycons.CLOUDY);
            // icon.set("Icon", Skycons.CLOUDY);
            break;
    
        default:
            break;
    }
    // icon.set("icon", data.current.weather[0].icon);
    icon.play();
   }
    

}













// Use the [OpenWeather API](https://openweathermap.org/api) t
// o retrieve weather data for cities. The documentation includes a
//  section called "How to start" that provides basic setup and usage i
//  nstructions. 
// You will use `localStorage` to store any persistent data.








// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
