import React from "react";

export function Greeting(){

    let greet = "";

    const myDate = new Date();

    const hrs = myDate.getHours();

    if (hrs < 12)
        greet = '🌅 Szép napot!';
    else if (hrs >= 12 && hrs <= 17)
        greet = '🌞 Szép délutánt!';
    else if (hrs >= 17 && hrs <= 24)
        greet = '🌇 Jó estét!';

    return <h1 style={ {textAlign : 'center', marginTop: 0}}>{greet}</h1>
}
