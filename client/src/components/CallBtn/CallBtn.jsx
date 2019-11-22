import React from 'react'
import CallIcon from '@material-ui/icons/Call';

import './CallBtn.css'

export default function CallBtn(props) {
    return (
        <div id="call-btn" className="call-wrapper" onClick={props.onClick}>
            <CallIcon />
        </div>
    )
}
