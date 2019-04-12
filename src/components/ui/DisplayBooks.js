import React, { Component } from 'react'
import Book from './components/ui/Book.js'

class DisplayBooks extends Component {

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
            <div className="display-books">
                <div className="container">
                    <div className="col-12">
                        <ul className="list-group">
                            {this.props.books.map(book => {
                            return (
                            <Book {...book} />
                            )
                        })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

}

export default DisplayBooks