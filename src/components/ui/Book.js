import React, { Component } from 'react'

class Book extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: props.title,
            author: props.author,
            editMode: false
        }

        this.toggleEdit = this.toggleEdit.bind(this)
        this.titleHandler = this.titleHandler.bind(this)
        this.authorHandler = this.authorHandler.bind(this)
        this.submitEdit = this.submitEdit.bind(this)
    }

    toggleEdit() {
        this.setState({
            editMode: !this.state.editMode
        })
    }

    titleHandler(event) {
        this.setState({
          title: event.target.value
        })
      }
    
    authorHandler(event) {
        this.setState({
          author: event.target.value
        })
      }

    async submitEdit() {
        const apiKey = await this.props.requestApiKey()
    
       this.props.request(`op=update&key=${apiKey}&id=${this.props.id}&title=${this.state.title}
        &author=${this.state.author}`, () => {
            console.log("Updated")
        })

        this.toggleEdit()
    }

    render() {

        return (
            <li className="list-item list-group-item d-flex align-items-center">
                {this.state.editMode ? <input className="title form-control" 
                defaultValue={this.state.title} onChange={this.titleHandler}/> 
                : <strong className="title">{this.state.title} </strong>}
            
                {this.state.editMode ? <input className="author form-control" 
                defaultValue={this.state.author} onChange={this.authorHandler}/> 
                : <div className="author">{this.state.author}</div>}
            
            <div className="buttons">

            {this.state.editMode ? 
                <button type="button"
                    className="btn btn-success"
                    onClick={this.submitEdit}>
                    Spara
                </button>
                :
                <button type="button"
                    className="btn btn-success"
                    onClick={this.toggleEdit}>
                    Editera
                </button>
                }
                <button type="button"
                    className="btn btn-danger"
                    onClick={() => this.props.deleteBook(this.props.id)}>
                    Ta bort
                </button>
            </div>
            </li>
        )

    }

}

export default Book