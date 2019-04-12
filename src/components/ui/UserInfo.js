import React, { Component } from 'react'

class UserInfo extends Component {

    render() {
        return (
            <div className="btn">
                <article>
                    <strong>{this.props.message}</strong>
                    <p>{"Attempts: " + this.props.count}</p>
                </article>
            </div>
        )
    }
}

export default UserInfo