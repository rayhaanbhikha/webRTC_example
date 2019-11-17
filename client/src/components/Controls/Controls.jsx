import React from 'react'

import CallBtn from '../CallBtn/CallBtn';
import StopBtn from '../StopBtn/StopBtn';

import './Controls.css'

export default function controls(props) {
    return (
        <div className="controls-wrapper">
            <div className="controls">
                <CallBtn onClick={props.onStart} />
                <div className="gap"></div>
                <StopBtn onClick={props.onStop} />
            </div>
        </div>
    )
}
