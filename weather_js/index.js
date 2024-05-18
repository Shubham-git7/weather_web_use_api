let cityName = document.querySelector(".weather_city");
let w_Search = document.querySelector(".weather_search");

let w_DateTime = document.querySelector(".wearher_date_time");
let w_forcast = document.querySelector(".weather_forcast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperatur");
let w_min = document.querySelector(".weather_min");
let w_max = document.querySelector(".weather_max");

let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_Wind = document.querySelector(".weather_Wind");
let w_pressure = document.querySelector(".weather_pressure");


const convert_country_code = (code) => {
    return new Intl.DisplayNames([code], { type: 'region' }).of(code);
}


let city = "pune";

w_Search.addEventListener("submit", (e) => {
    e.preventDefault();

    let cityName = document.querySelector(".city_search");
    console.log(cityName.value);
    city = cityName.value;

    getWeatherData();

    cityName.value = "";
});

const getDatetime = (dt) => {
    const curDate = new Date(dt * 1000);
    console.log(curDate);

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    //easyb work wow below
    return curDate.toLocaleDateString("en-US", options);

}


const getWeatherData = async () => {

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=be2ddb676bc999a97a4baae2296f7bd9`;

    try {
        const res = await fetch(weatherUrl);
        const data = await res.json();
        console.log(data);

        const { main, sys, weather, name, wind, dt } = data;

        cityName.innerHTML = `${name}, ${convert_country_code(sys.country)}`;
        w_DateTime.innerHTML = getDatetime(dt);

        w_forcast.innerHTML = weather[0].main;
        w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;

        w_temperature.innerHTML = `${main.temp}&#176`;
        w_min.innerHTML = `Min: ${main.temp_min.toFixed()}&#176`;
        w_max.innerHTML = `Max: ${main.temp_max.toFixed()}&#176`;

        w_feelsLike.innerHTML = `${main.feels_like.toFixed(2)}&#176`;
        w_humidity.innerHTML = `${main.humidity}%`;
        w_Wind.innerHTML = `${wind.speed} m/s`;
        w_pressure.innerHTML = `${main.pressure} hPa`;






    } catch (error) {
        console.log(error);
    }
};

document.body.addEventListener("load", getWeatherData());










