import React from 'react'

export default function Call(props) {
    const userToCall = props.location.state;
    return (
        <div>
            username {userToCall.username}
            id {userToCall.id}
        </div>
    )
}
