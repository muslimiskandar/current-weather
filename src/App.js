import React, { useState } from "react";

const api = {
  key: "690e7d08c2876f61489010f7070c7718",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <header>
        <h3>Weather Forecast</h3>
      </header>
      <main>
        <div className="search-box">
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            className="search-bar"
            placeholder="Search..."
          />
        </div>
        {typeof weather.main !== "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
            <div className="detailed-weather">
              <div>
                <i className="fas fa-thermometer-three-quarters"></i>
                <div>
                  <p>{Math.round(weather.main.feels_like)}°C</p>
                  <span>Real feel</span>
                </div>
              </div>
              <div>
                <i className="fas fa-tint"></i>
                <div>
                  <p>{weather.main.humidity}</p>
                  <span>Humidity</span>
                </div>
              </div>
              <div>
                <i className="fas fa-wind"></i>
                <div>
                  <p>{weather.wind.speed} km/h</p>
                  <span>Wind</span>
                </div>
              </div>
              <div>
                <i className="fas fa-compress-arrows-alt"></i>
                <div>
                  <p>{weather.main.pressure}</p>
                  <span>Pressure</span>
                </div>
              </div>
              <div className="wind-direction">
                <div>
                  {weather.wind.speed !== "undefined" ? (
                    (weather.wind.deg >= 0 && weather.wind.deg <= 23) ||
                    (weather.wind.deg >= 337 && weather.wind.deg <= 360) ? (
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <p>North</p>
                        <i className="fas fa-location-arrow north"></i>
                      </div>
                    ) : weather.wind.deg >= 24 && weather.wind.deg <= 68 ? (
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <p>Northeast</p>
                        <i className="fas fa-location-arrow north-east"></i>
                      </div>
                    ) : weather.wind.deg >= 69 && weather.wind.deg <= 113 ? (
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <p>East</p>
                        <i className="fas fa-location-arrow east"></i>
                      </div>
                    ) : weather.wind.deg >= 114 && weather.wind.deg <= 158 ? (
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <p>Southeast</p>
                        <i className="fas fa-location-arrow south-east"></i>
                      </div>
                    ) : weather.wind.deg >= 159 && weather.wind.deg <= 203 ? (
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <p>South</p>
                        <i className="fas fa-location-arrow south"></i>
                      </div>
                    ) : weather.wind.deg >= 204 && weather.wind.deg <= 248 ? (
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <p>Southwest</p>
                        <i className="fas fa-location-arrow south-west"></i>
                      </div>
                    ) : weather.wind.deg >= 249 && weather.wind.deg <= 293 ? (
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <p>West</p>
                        <i className="fas fa-location-arrow west"></i>
                      </div>
                    ) : weather.wind.deg >= 294 && weather.wind.deg <= 336 ? (
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <p>Northwest</p>
                        <i className="fas fa-location-arrow north-west"></i>
                      </div>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                  <div>
                    <span>Wind direction</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
