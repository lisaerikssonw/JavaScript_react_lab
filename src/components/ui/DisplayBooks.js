import React, { Component } from 'react'

class DisplayBooks extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        const bookList = this.props.books.map(book => {
            return (<li key={book.id} className="list-item list-group-item d-flex align-items-center">
                <strong className="title">{book.title}</strong>

                <div className="author">{book.author}</div>

                <div className="buttons">
                    <button type="button" className="btn btn-success">
                        Editera
                    </button>
                    <button type="button" className="btn btn-danger">
                        Ta bort
                    </button>
                </div>
            </li>)
        })

        return (
            <div className="display-books">
                <div className="container">
                    <div className="col-12">
                        <ul className="list-group">
                            {bookList}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

}

export default DisplayBooks