
function initMap() {
    const searchElement = document.getElementById("searchBox");
    let searchBox = new google.maps.places.SearchBox(searchElement);
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
                setWeatherData(data, place.formatted_address)
                console.log(data);
            });
        // let icon = `http://openweathermap.org/img/wn/` + data.weather[0].icon + `.png`;
        // console.log(icon);
    });



    // const icon = new Skycons({ color: "black" });
    const todaysDate = document.querySelector("[data-date]");
    const location = document.querySelector("[data-location]");
    const tempEle = document.querySelector("[data-Temp]");
    const humidity = document.querySelector("[data-Humidity]");
    const wind = document.querySelector("[data-Wind]");
    const uVindex = document.querySelector("[data-UVindex]");
    const summary = document.querySelector("[data-summary]");

    // icon.add("Icon", "clear_day");
    // icon.play();

    function setWeatherData(data, place) {
        todaysDate.textContent = moment.unix(data.current.dt).format('MMMM Do YYYY, h:mm:ss A');
        location.textContent = place
        tempEle.textContent = data.current.temp
        humidity.textContent = data.current.humidity
        wind.textContent = data.current.wind_speed
        uVindex.textContent = data.current.uvi
        summary.textContent = data.current.weather[0].description
        console.log(data.current.weather[0].main);



        // let resentSearch_stringyfy = JSON.stringify(data,);
        // let resentSearch = localStorage.setItem("resentSearch", resentSearch_stringyfy);
        // var savedValue = JSON.parse(localStorage.getItem("resentSearch"));




        var savedValue = localStorage.getItem("resentSearch");
        if (savedValue !== null) {
            localStorage.setItem("resentSearch1", savedValue)
        }
        let resentSearch = localStorage.setItem("resentSearch", place);




        if (savedValue) {
            let newCity = document.querySelector(".city").innerHTML = savedValue;
           
        }

        // console.log(savedValue);

        // switch (data.current.weather[0].main) {
        //     case "Clouds":
        //         icon.add("Icon", "cloudy");
        //         break;
        //     case "Clear":
        //         icon.add("Icon", "clear_night");
        //         break;
        //         case "Clear":
        //         icon.add("Icon", "clear_night");
        //         break;
        //         case "Clear":
        //         icon.add("Icon", "clear_night");
        //         break;

        //     default:
        //         break;
        // }
        // // icon.set("icon", data.current.weather[0].icon);
        // icon.play();
    }

}

function city(){
    newCity.innerHTML = searchElement
}
//        // populate saved values
//        var savedValue = localStorage.getItem(data,place);
//     //    if (savedValue !== null){
//     //        elements[item].value = savedValue;
//            console.log(localStorage)
//        }
//    }

//    function clickActionListener(element, e){
//        e.preventDefault();
//        var startTime = element.dataset.startTime;
//        var inputValue = element.parentElement.previousElementSibling.value;
//        if(inputValue.trim() != ""){
//            localStorage.setItem(startTime, inputValue);
//        }    
//    }















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
