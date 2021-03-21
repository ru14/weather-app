const localStorageKey = "weather.searches";
let recentSearches = JSON.parse(localStorage.getItem(localStorageKey)) || [];
// inintmap to find pooulat search and get long & lat
var initMap = function () {
    let searchElement = document.getElementById("searchBox");
    let searchBox = new google.maps.places.SearchBox(searchElement);
    console.log("changed")
    searchBox.addListener("places_changed", () => {
        const place = searchBox.getPlaces()[0];
        console.log("searching")
        if (place == null) return
        const latitude = place.geometry.location.lat();
        const longitude = place.geometry.location.lng();
        // const proxy = `https://cors-anywhere.herokuapp.com/`
        const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&appid=f9ca789169d967eac2bc191ca630ca88`


        fetch(api)
            .then(response => {
                console.log("api response")
                return response.json();
            })
            .then(data => {
                console.log("data retreived");
                setWeatherData(data, place.formatted_address,);
                recentSearches.push(place.formatted_address);
                localStorage.setItem(localStorageKey, JSON.stringify(recentSearches));
                console.log(recentSearches);
                console.log(data);
            });
    });
}
// to populate the resent search
for (i = (recentSearches.length - 1); i >= (recentSearches.length - 9); i--) {
    document.querySelector("#recentSearches").innerHTML +=
        `<div class="city">
   ${recentSearches[i]}
    </div>`;
}
let searchButtons = document.querySelectorAll(".city")

for (i = 0; i < searchButtons.length; i++) {
    searchButtons[i].addEventListener("click", function (e) {
        console.log(e.target.innerText)
        document.querySelector("#searchBox").value = e.target.innerText;

  initMap();
})}

;
const todaysDate = document.querySelector("[data-date]");
const location2 = document.querySelector("[data-location]");
const tempEle = document.querySelector("[data-Temp]");
const humidity = document.querySelector("[data-Humidity]");
const wind = document.querySelector("[data-Wind]");
const uVindex = document.querySelector("[data-UVindex]");
const summary = document.querySelector("[data-summary]");
const tempMon = document.querySelector("[data-MonTemp]");
const humMon = document.querySelector("[data-MonHumidity]");
// weekday 
const tempTue = document.querySelector("[data-TueTemp]");
const humTue = document.querySelector("[data-TueHumidity]");
const tempWed = document.querySelector("[data-WedTemp]");
const humWed = document.querySelector("[data-WedHumidity]");
const tempThus = document.querySelector("[data-ThusTemp]");
const humThus = document.querySelector("[data-ThusHumidity]");
const tempFri = document.querySelector("[data-FriTemp]");
const humFri = document.querySelector("[data-FriHumidity]");



function setWeatherData(data, place) {
    todaysDate.textContent = moment.unix(data.current.dt).format('MMMM Do YYYY, h:mm:ss A');
    location2.textContent = place;
    tempEle.textContent = `${Math.floor(data.current.temp)} F / ${Math.floor((data.current.temp-32)*5/9)} C;`
    humidity.textContent = data.current.humidity;
    wind.textContent = data.current.wind_speed;
    uVindex.textContent = data.current.uvi
    summary.textContent = data.current.weather[0].description

    // console.log(data.current.weather[0].main);
    // console.log(time)
    // console.log(data.daily.temp);

    setDailyWeatherData(data, place)
}

    
function setDailyWeatherData(data, place) {
    tempMon.textContent = data.daily[0].temp.max
    humMon.textContent = data.daily[0].humidity
    tempTue.textContent = data.daily[1].temp.max
    humTue.textContent = data.daily[1].humidity
    tempWed.textContent = data.daily[2].temp.max
    humWed.textContent = data.daily[2].humidity
    tempThus.textContent = data.daily[3].temp.max
    humThus.textContent = data.daily[3].humidity
    tempFri.textContent = data.daily[4].temp.max
    humFri.textContent = data.daily[4].humidity
    let icon = `http://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}@2x.png`
    $(".icon").attr("src", icon);
    let iconM = `http://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}@2x.png`
    $(".iconmon").attr("src", iconM);
    //    console.log("mon="+iconM);
    let iconTu = `http://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}@2x.png`
    $(".icontue").attr("src", iconTu);
    let iconW = `http://openweathermap.org/img/wn/${data.daily[3].weather[0].icon}@2x.png`
    $(".iconthus").attr("src", iconW);
    let iconTh = `http://openweathermap.org/img/wn/${data.daily[4].weather[0].icon}@2x.png`
    $(".iconfri").attr("src", iconTh);
}



// document.querySelectorAll(".faren").forEach(elem=>{
//     elem.addEventListener("click",function(e){
//         WhateverTheElementIs.innerText ="" //grab value of temperature and do mathematic on it to convert
//     })
//     })































//     var savedValue = localStorage.getItem("resentSearch");

//     if (savedValue !== null) {
//         // localStorage.setItem("resentSearch7", savedValue)
//         // localStorage.getItem("resentSearch6", savedValue)
//         // localStorage.setItem("resentSearch6", savedValue)
//         // localStorage.getItem("resentSearch5", savedValue)
//         // localStorage.setItem("resentSearch5", savedValue)
//         // localStorage.getItem("resentSearch4", savedValue)
//         // localStorage.setItem("resentSearch4", savedValue)
//         // localStorage.getItem("resentSearch3", savedValue)
//         // localStorage.setItem("resentSearch4", savedValue)
//         // localStorage.getItem("resentSearch3", savedValue)
//         // localStorage.setItem("resentSearch3", savedValue)
//         // localStorage.getItem("resentSearch2", savedValue)
//         // localStorage.setItem("resentSearch2", savedValue)
//         // localStorage.getItem("resentSearch1", savedValue)
//         localStorage.setItem("resentSearch1", savedValue)

//     }
//     let resentSearch = localStorage.setItem("resentSearch", place);

//     if (savedValue) {
//         document.querySelector(".city").innerHTML = savedValue;
//     }

//     renderLastRegistered();

// }
// // console.log(savedValue);


// function renderLastRegistered() {
//     document.getElementById("cityOne").onclick = function moveContent() {
//         document.getElementById("cityOne").innerHTML = searchElement.Value
//     }
// }


    // set cityValue in search Element








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


// let resentSearch_stringyfy = JSON.stringify(data,);
        // let resentSearch = localStorage.setItem("resentSearch", resentSearch_stringyfy);
        // var savedValue = JSON.parse(localStorage.getItem("resentSearch"));







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
