import React, {useState} from 'react';
import './App.css';
import {ApiKeyModal} from "./components/ApiKeyModal/ApiKeyModal";
import {Greeting} from "./components/Greeting/Greeting";
import {LocalWeather} from "./components/LocalWeather/LocalWeather";

function App() {

    const [state, setState] = useState(
        {
            show: true,
            apiKey: "",
        }
    );

    function handleClose() {
        setState({
            ...state,
            show: false,
        })
    }

    function onChangeInput(apiKey: string) {
        setState({
            ...state,
            apiKey: apiKey,
        })
    }

    function bodyRender() {
        if(state.apiKey && !state.show) {
            return <div className="container"><LocalWeather apiKey={state.apiKey}/></div>
        }
        else {
            return
        }
    }

    return (
        <div className="app">
            <ApiKeyModal show={state.show} onChangeInput={onChangeInput} handleClose={handleClose}/>
            <Greeting/>
            {bodyRender()}
        </div>
    );
}

export default App;
