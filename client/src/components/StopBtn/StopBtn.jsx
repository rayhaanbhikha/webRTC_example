import React from 'react'

import CallEndIcon from '@material-ui/icons/CallEnd';

import './StopBtn.css'

export default function StopBtn(props) {
    return (
        <div className="stop-call-wrapper" onClick={props.onClick}>
            <CallEndIcon />
        </div>
    )
}
