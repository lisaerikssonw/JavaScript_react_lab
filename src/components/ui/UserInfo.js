import React from 'react'

// Här hade en functional component kommit väl till pass
const UserInfo = props => (
    <div className="userInfo">
        <article>
            <strong>{props.message}</strong>
            {/* Använd template-string för att konkatenera strängar */}
            <p>{`Attempts: ${props.count}`}</p>
        </article>
    </div>
)


export default UserInfo