import React, {useState} from 'react';
import './App.css';
import {ApiKeyModal} from "./components/ApiKeyModal/ApiKeyModal";
import {Greeting} from "./components/Greeting/Greeting";
import {LocalWeather} from "./components/LocalWeather/LocalWeather";
import {SearchedCityWeather} from "./components/SearchedCityWeather/SearchedCityWeather";

function App() {

    const [state, setState] = useState(
        {
            show: true,
            apiKey: "",
        }
    );

    function handleClose() {
        console.log('handleClose', state);
        setState({
            ...state,
            show: false,
        })
    }

    function onChangeInput(apiKey: string) {
        console.log('onChangeInput', state);
        setState({
            ...state,
            apiKey: apiKey,
        })
    }

    function bodyRender() {
        if(state.apiKey && !state.show) {
            console.log('bodyRender', state);
            return <div className="container">
                <LocalWeather apiKey={state.apiKey}/>
                <SearchedCityWeather apiKey={state.apiKey}/>
            </div>
        }
        else {
            return
        }
    }

    console.log('App', state);

    return (
        <div className="app">
            <ApiKeyModal show={state.show} onChangeInput={onChangeInput} handleClose={handleClose}/>
            <Greeting/>
            {bodyRender()}
        </div>
    );
}

export default App;
