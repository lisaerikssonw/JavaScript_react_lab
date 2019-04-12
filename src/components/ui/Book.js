import React, {Component} from 'react'

class Book extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: props.title,
            author: props.author,
            id: props.id,
            editMode: false
        }
    }

    render() {

        return(
            <li className="list-item list-group-item d-flex align-items-center">
                    <strong className="title">Titel</strong>

                    <div className="author">{book.author}</div>

                    <div className="buttons">
                        <button type="button"
                            className="btn btn-success">
                            Editera
                    </button>
                        <button type="button"
                            className="btn btn-danger"
                            //FIXA DELETEBOOK
                            onClick={() => this.props.deleteBook(book.id)}>
                            Ta bort
                    </button>
                    </div>
                </li>
        )
        
    }

}

export default Book