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
                {this.props.editMode ? <input onChange={this.props.titleHandler}/> : 
                <strong classname="title">{this.state.title}</strong>}
            
                {this.props.editMode ? <input onChange={this.props.authorHandler}/> : 
                <div className="author">{this.state.author}</div>}
            
            <div className="buttons">

            {this.props.editMode ? 
                <button type="button"
                    className="btn btn-success"
                    onClick={this.props.submitEdit}>
                    Spara
                </button>
                :
                <button type="button"
                    className="btn btn-success"
                    onClick={this.props.toggleEdit}>
                    Editera
                </button>
                }
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