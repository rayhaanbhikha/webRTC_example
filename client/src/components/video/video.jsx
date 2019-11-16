import React from 'react'

import './Video.css'

export default function Video(props) {
    return (
        <video id={props.id} width="450" autoPlay></video>
    )
}
