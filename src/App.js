import React, { Component } from 'react'
import Header from './components/ui/Header/Header'
import SubmitBook from './components/ui/SubmitBook'
import Book from './components/ui/Book'
const url = "https://www.forverkliga.se/JavaScript/api/crud.php?"

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      books: [],
      title: '',
      author: '',
      id: '',
      editMode: false
    }

    this.titleHandler = this.titleHandler.bind(this)
    this.authorHandler = this.authorHandler.bind(this)
    this.submitBook = this.submitBook.bind(this)
    this.fetchBooks = this.fetchBooks.bind(this)
    this.request = this.request.bind(this)
    this.deleteBook = this.deleteBook.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)

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

  async submitBook(event) {
    event.preventDefault()
    console.log('Book added')
    let apiKey = await this.requestApiKey()

    this.request(`op=insert&key=${apiKey}&title=${this.state.title}&author=${this.state.author}`, data => {
      this.setState({
        id: data.id
      })
    })

    this.setState(prevState => {
      const newBook = { title: this.state.title, author: this.state.author, id: this.state.id }
      const newList = prevState.books ? prevState.books.concat(newBook) : [newBook]
      return {
        books: newList
      }
    })
  }

  async deleteBook(id) {
    let apiKey = await this.requestApiKey()

    await this.request(`op=delete&key=${apiKey}&id=${id}`, data => {
      console.log("Book deleted")
    })

    this.fetchBooks()
  }

  toggleEdit() {
    this.setState({
        editMode: !this.state.editMode
    })
  }

  submitEdit() {
    this.toggleEdit()
  }

  request(qs, cb, limit = 10) {
    fetch(`${url}${qs}`)
      .then(response => response.json())
      .then(data => {
        if (data.status === "success") {
          if (cb) {
            cb(data)
          }
        } else if (limit > 0) {
          this.request(qs, cb, limit - 1)
        } else {
          console.log("Thomas hade rätt")
        }
      })
      .catch(error => console.log(error))
  }

  async requestApiKey() {
    let apiKey = localStorage.getItem('apiKey')

    if (!apiKey) {
      apiKey =
        await fetch(`${url}requestKey`)
          .then(response => response.json())
          .then(data => {
            localStorage.setItem('apiKey', data.key)
            return data.key

          })
          .catch(error => console.log(error))
    }
    return apiKey
  }

  async fetchBooks() {
    let apiKey = await this.requestApiKey()

    await this.request(`op=select&key=${apiKey}`, data => {
      this.setState({
        books: data.data
      })
    })
  }

  componentDidMount() {
    this.fetchBooks()
  }

  componentDidUpdate() {
    console.log(this.state.title)
  }

  render() {

    const bookList = this.state.books.map(book => {return(
      <Book {...book} 
      deleteBook={this.deleteBook} 
      key={book.id}
      titleHandler={this.titleHandler}
      authorHandler={this.authorHandler}
      toggleEdit={this.toggleEdit}
      submitEdit={this.submitEdit}
      editMode = {this.state.editMode}
      />
    )})

    return (
      <div className="App">
        <Header />
        <SubmitBook submitBook={this.submitBook}
          titleHandler={this.titleHandler}
          authorHandler={this.authorHandler}
        />
        <div className="display-books">
                <div className="container">
                    <div className="col-12">
                        <ul className="list-group">
                            {bookList}
                        </ul>
                    </div>
                </div>
            </div>
      </div>
    )
  }
}

export default App
