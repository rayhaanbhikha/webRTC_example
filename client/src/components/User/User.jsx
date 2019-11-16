import React from 'react'

import "./User.css"

export default function User(props) {
    return (
        <div className="user">
            <div className="user-l">
                {props.username}
            </div>
            <div className="user-r">
                <button onClick={props.onClick}> Call </button>
            </div>
        </div>
    )
}
