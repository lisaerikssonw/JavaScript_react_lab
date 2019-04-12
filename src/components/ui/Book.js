import React, { Component } from 'react'

class Book extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: props.title,
            author: props.author,
            id: props.id
        }
    }

    render() {


        return (
            <li className="list-item list-group-item d-flex align-items-center">
                <strong className="title">{this.state.title}</strong>
            <div className="author">{this.state.author}</div>
            <div className="buttons">
                <button type="button"
                    className="btn btn-success"
                    onClick={this.props.toggleEdit}>
                    Editera
                </button>
                <button type="button"
                    className="btn btn-danger"
                    onClick={() => this.props.deleteBook(this.state.id)}>
                    Ta bort
                </button>
            </div>
            </li>
        )

    }

}

export default Book