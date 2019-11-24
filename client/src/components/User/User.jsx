import React from 'react'

import "./User.css"

export default function User(props) {
    return (
        <div className="user" onClick={props.onClick}>
            {props.username}
        </div>
    )
}
