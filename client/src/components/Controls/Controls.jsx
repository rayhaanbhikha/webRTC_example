import React from 'react'

import CallIcon from '@material-ui/icons/Call';
import CallEndIcon from '@material-ui/icons/CallEnd';

import './Controls.css'

export default function Controls(props) {

    const className = !props.active ? "call" : "callend";

    return (
        <div className="controls">
            <div className={`call-wrapper ${className}`} onClick={props.onClick}>
                {!props.active ? <CallIcon /> : <CallEndIcon />}
            </div>
        </div>
    )
}
