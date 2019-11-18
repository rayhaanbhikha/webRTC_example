import React from 'react'

import Controls from '../Controls/Controls';
import './Video.css'

export default function Video(props) {
    return (
        <div className="video-feed">
            <video id="remote-video" width="" autoPlay></video>
            <video id="local-video" width="" autoPlay></video>
            <Controls {...props} />
        </div>
    )
}
