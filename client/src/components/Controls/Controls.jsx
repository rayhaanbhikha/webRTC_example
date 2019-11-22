import React, { useState } from 'react'

import CallBtn from '../CallBtn/CallBtn';
import StopBtn from '../StopBtn/StopBtn';

import './Controls.css'

export default function Controls(props) {
    const [showControls, setshowControls] = useState("hidden")

    const toggleVisibility = () => {
        if(showControls === "hidden") {
            setshowControls("unset");
        } else {
            setshowControls("hidden");
        }
    }

    return (
        // <div className="controls-wrapper" onMouseEnter={toggleVisibility} onMouseLeave={toggleVisibility}>
            <div className="controls">
                <CallBtn onClick={props.onStart} />
                <div className="gap"></div>
                <StopBtn id="stop-btn" onClick={props.onStop} />
            </div>
        // </div>
    )
}
