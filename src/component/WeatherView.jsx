import React, { useState } from "react";

export const WeatherView = ({ data }) => {
  const dt = data;

  const cel = dt?.main.temp - 273.15;

  const [celsius, setCelsius] = useState(cel.toFixed(2));

  const [change, setChange] = useState(false);

  const handleChange = () => {
    setChange(!change);

    let changeCelsius = !change
      ? (celsius * 9) / 5 + 32
      : dt?.main.temp - 273.15;

    setCelsius(changeCelsius.toFixed(2));
  };

  
  return (
    <section className="weather animate__animated animate__zoomInDown">
      <article>
        <h1>Weather App</h1>

        <p>
          {dt?.name}, {dt?.sys.country}
        </p>
      </article>

      <section className="weather__content">
        <article className="weather__img">
          <img
            src={`https://openweathermap.org/img/wn/${dt?.weather[0].icon}@2x.png`}
            alt="clouds"
          />
        </article>

        <article className="weather__footer">
          <h2>"{dt?.weather[0].description}"</h2>
          <ul>
            <li>
              <span>Wind Spped</span> {dt?.wind.speed}m/s
            </li>
            <li>
              <span>Clouds</span> {dt?.clouds.all}%
            </li>
            <li>
              <span>Pressure</span> {dt?.main.pressure}hpa
            </li>
          </ul>
        </article>
      </section>

      <p className="weather__celsius">
        {!change ? `${celsius} °C` : `${celsius} °F`}
      </p>

      <button className="button__weather" onClick={handleChange}>
        Change to
        {!change ? <span>°F</span> : <span>°C</span>}
      </button>
    </section>
  );
};
