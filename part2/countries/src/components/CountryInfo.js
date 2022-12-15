import { useState, useEffect } from "react";
import axios from "axios";

const CountryInfo = ({country}) => {

    const [weatherData, setWeatherData] = useState({});

    let latlng = country.capitalInfo.latlng;
    const hook = () => {
        let owURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&units=imperial&appid=${process.env.REACT_APP_OW_API_KEY}`;
        axios.get(owURL).then((response) => {
            setWeatherData(response.data);
        });
    };

    useEffect(hook, [latlng]);

    return(
        <div>
            <h2>{country.name.common}</h2>
            <div>capital {country.capital[0]}</div>
            <div>area {country.area}</div>
            <h3>languages:</h3>
            <ul>
                {Object.values(country.languages).map((language) => (<li key={language}> {language} </li>))}
            </ul>
            <img src={country.flags.png} alt={country.name.common.concat(" ", "flag")}/>
            <h2>Weather in {country.name.common}</h2>
            {Object.keys(weatherData).length !== 0 &&
            <>
                <div>temperature {weatherData.main.temp} Fahrenheit</div>
                <img src={"https://openweathermap.org/img/wn/".concat(weatherData.weather[0].icon,"@2x.png")} alt="weather icon" />
                <div>wind {weatherData.wind.speed} miles/hour </div>
            </>
            }
        </div>
        
    );
};
export default CountryInfo;