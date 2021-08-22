import React, {useState, useEffect} from "react";
import axios from "axios";
import {Button} from "react-bootstrap";

interface SearchedCityWeatherProps {
    apiKey: string
}

interface SearchedCityWeatherState {
    name: string,
    errorMessage?: string,
    temperatureC?: number,
    city?: string,
    country?: string,
    humidity?: number,
    description?: string,
    sunrise?: any,
    feelsLike?: any,
    sunset?: any,
    errorMsg?: string,
    sys: any,
    weather?: any,
    wind: any,
    main?: any,
    icon?: any
}

const initialState: SearchedCityWeatherState = {
    name: "",
    errorMessage: undefined,
    temperatureC: 0,
    city: "",
    country: undefined,
    humidity: undefined,
    description: undefined,
    sunrise: undefined,
    feelsLike: undefined,
    sunset: undefined,
    errorMsg: undefined,
    sys: {},
    weather: [],
    wind: {},
    main: "",
    icon: ""
}

export function SearchedCityWeather(props: SearchedCityWeatherProps) {
    const [query, setQuery] = useState("");
    const [error, setError] = useState("");
    const [weather, setWeather] = useState(initialState);

    const search = (city: string) => {
        axios
            .get(
                `https://api.openweathermap.org/data/2.5/weather?q=${
                    !!city ? city : query
                }&units=metric&APPID=${props.apiKey}`
            )
            .then((response) => {
                setWeather(response.data);
                // setQuery("");
            })
            .catch(function (error) {
                console.log(error);
                setWeather({...initialState});
                setQuery("");
                setError("nem található");
            });
    };

    useEffect(() => {
        search("Pécs");
    }, []);

    const handleSearch = (event: any) => {
        if (event.key === "Enter") {
            if (query !== "" || query !== undefined) {
                search(query)
            } else {
                return
            }
        } else {
            return
        }
    };

    function handleReSearch() {
            if (query !== "" || query !== undefined) {
                search(query)
            } else {
                return
            }
    }

    return (
        <div className="forecast">
            <div className="today-weather">
                <h3>További városok:</h3>
                <div className="search-box">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Keresés..."
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={handleSearch}
                        value={query}
                    />
                </div>
                <ul>
                    {typeof weather.main != "undefined" ? (
                        <div>
                            {" "}
                            <li className="cityHead">
                                <p>
                                    {weather.name}, {weather.sys?.country}
                                </p>
                                <img
                                    className="temp"
                                    src={`https://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}.png`}
                                />
                            </li>
                            <li>
                                Hőmérséklet{" "}
                                <span className="temp">
                  {Math.round(weather.main?.temp)}°C ({weather.weather?.[0]?.main})
                </span>
                            </li>
                            <li>
                                Hőérzet{" "}
                                <span className="temp">
                  {Math.round(weather.main?.feels_like)}°C
                </span>
                            </li>
                            <li>
                                Páratartalom{" "}
                                <span className="temp">
                  {Math.round(weather.main?.humidity)}%
                </span>
                            </li>
                            <li>
                                Szél{" "}
                                <span className="temp">
                  {Math.round(weather.wind?.speed)} Km/h
                </span>
                            </li>
                        </div>
                    ) : (
                        <li>
                            {error}
                        </li>
                    )}
                </ul>
                {query !== "" && query === weather.name ?
                    <div style={{width: "100%", display: "flex"}}><Button variant="success"
                                                                          style={{padding: "10px", margin: "10px auto"}}
                                                                          onClick={() => handleReSearch}>Újratöltés</Button>
                    </div> : ""}
            </div>
        </div>
    );
}
