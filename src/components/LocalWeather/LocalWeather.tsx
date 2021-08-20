import React, {useEffect, useState} from "react";
import Clock from "react-live-clock";
import classNames from 'classnames';

const dateBuilder = (d: Date) => {
    let months = [
        "Január",
        "Február",
        "Március",
        "Április",
        "Május",
        "Június",
        "Július",
        "Augusztus",
        "Szeptember",
        "Október",
        "November",
        "December",
    ];
    let days = [
        "Vasárnap",
        "Hétfő",
        "Kedd",
        "Szerda",
        "Csütörtök",
        "Péntek",
        "Szombat",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${year} ${month} ${date} ( ${day} )`;
};

const defaults = {
    color: "white",
    size: 112,
    animate: true,
};

interface LocalWeatherProps {
    apiKey: string
}

interface LocalWeatherState {
    lat?: number,
    lon?: number,
    errorMessage?: string,
    temperatureC?: number,
    temperatureF?: number,
    city?: string,
    country?: string,
    humidity?: number,
    description?: string,
    icon: string,
    sunrise?: any,
    feelsLike?: any,
    sunset?: any,
    errorMsg?: string,
    main?: any,
    timerID?: any
}

const initialState: LocalWeatherState = {
    lat: undefined,
    lon: undefined,
    errorMessage: undefined,
    temperatureC: 0,
    temperatureF: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    icon: "CLEAR_DAY",
    sunrise: undefined,
    feelsLike: undefined,
    sunset: undefined,
    errorMsg: undefined,
    main: "",
    timerID: ""
}

export function LocalWeather(props: LocalWeatherProps) {
    const [state, setState] = useState(initialState);

    function start() {
        if (navigator.geolocation) {
            getPosition()
                .then((position: any) => {
                    getWeather(position.coords.latitude, position.coords.longitude);
                })
                .catch((err) => {
                    getWeather(46.08333, 18.23333);
                    alert(
                        "Engedélyezd a helymeghatározást!"
                    );
                });
        } else {
            alert("Nem elérhető helyzet");
        }

        setState({ ...state,
            timerID : setInterval(
                () => getWeather(state.lat, state.lon),
                600000
            )
        });
    }

    useEffect(() => {
        start()
        return () => {
            stop()
        }
    });


    function stop() {
        clearInterval(state.timerID);
    }

    const getPosition = () => {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    };
    const getWeather = async (lat: any, lon: any) => {
        const api_call = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&&lang=hu&APPID=${props.apiKey}`
        );

        const data = await api_call.json();
        setState({
            ...state,
            lat: lat,
            lon: lon,
            city: data.name,
            temperatureC: Math.round(data.main.temp),
            humidity: data.main.humidity,
            feelsLike: Math.round(data.main.feels_like),
            main: data.weather[0].main,
            country: data.sys.country
        });
        switch (state.main) {
            case "Haze":
                setState({...state, icon: "CLEAR_DAY"});
                break;
            case "Clouds":
                setState({...state, icon: "CLOUDY"});
                break;
            case "Rain":
                setState({...state, icon: "RAIN"});
                break;
            case "Snow":
                setState({...state, icon: "SNOW"});
                break;
            case "Dust":
                setState({...state, icon: "WIND"});
                break;
            case "Drizzle":
                setState({...state, icon: "SLEET"});
                break;
            case "Fog":
                setState({...state, icon: "FOG"});
                break;
            case "Smoke":
                setState({...state, icon: "FOG"});
                break;
            case "Tornado":
                setState({
                    ...state,
                    icon: "WIND"
                });
                break;
            default:
                setState({...state, icon: "CLEAR_DAY"});
        }
    };


    if (!state) {
        return <span>Töltődik...</span>;
    } else if (state.temperatureC) {
        return (
            <React.Fragment>
                <div className={classNames('city', {
                    'bg-clear': state.main === "Clear",
                    'bg-haze': state.main === "Haze",
                    'bg-clouds': state.main === "Clouds",
                    'bg-rain': state.main === "Rain",
                    'bg-snow': state.main === "Snow",
                    'bg-dust': state.main === "Dust",
                    'bg-drizzle': state.main === "Drizzle",
                    'bg-fog': state.main === "Fog",
                    'bg-smoke': state.main === "Smoke",
                    'bg-tornado': state.main === "Tornado"
                })}>
                    <div className="title">
                        <h2>{state.city}</h2>
                        <h3>{state.country}</h3>
                    </div>
                    <div className="mb-icon">
                    </div>
                    <div className="date-time">
                        <div className="dmy">
                            <div id="txt"></div>
                            <div className="current-time">
                                <Clock format="HH:mm:ss" interval={1000} ticking={true}/>
                            </div>
                            <div className="current-date">{dateBuilder(new Date())}</div>
                        </div>
                        <div className="temperature">
                            <p>
                                {state.temperatureC}°C
                            </p>
                        </div>
                        <div style={{
                            width: "100%",
                            float: "right"
                        }}>
                            <div className="w-100">
                                <p className="feelsLike">
                                    Hőérzet: {state.feelsLike}°C
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
                {/*<Forecast icon={state.icon} weather={this.state.main}/>*/}
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%"
                }}>
                    <h3 style={{color: "white", marginTop: "10px"}}>
                        A jelenlegi tartózkodási helyed rögtön megjelenik... Kis türelmet
                    </h3>
                </div>
            </React.Fragment>
        );
    }
}
