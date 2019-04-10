import React, { Component } from 'react'
import Header from './components/ui/Header/Header'
import SubmitBook from './components/ui/SubmitBook'
import DisplayBooks from './components/ui/DisplayBooks'
const url = "https://www.forverkliga.se/JavaScript/api/crud.php?"

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      books: [],
      title: '',
      author: '',
      id: ''
    }

    this.componentDidMount = this.componentDidMount.bind(this)
    this.titleHandler = this.titleHandler.bind(this)
    this.authorHandler = this.authorHandler.bind(this)
    this.submitBook = this.submitBook.bind(this)
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
    console.log('Book added')

    let apiKey = await this.requestApiKey()

    await fetch(`${url}op=insert&key=${apiKey}&title=${this.state.title}&author=${this.state.author}`)
      .then(response => response.json())
      .then(data => {
        if(data.status === "success") {
          this.setState({
            id: data.data.id
          })
        } else {
          console.log('Error')
        }
      })
      .catch(message => console.log(message))

    await this.setState(prevState => {
      const newBook = {title: this.state.title, author: this.state.author, id: this.state.id}
      const newList = prevState.books ? prevState.books.concat(newBook) : [newBook]

      return {
        books: newList
      }
    })
    
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
    }
    return apiKey
  }

  async fetchBooks() {
    let apiKey = await this.requestApiKey()
    fetch(`${url}op=select&key=${apiKey}`)
      .then(request => request.json())
      .then(data => {
        if(data.status === "success") {
          this.setState({
            books: data.data
          })    
        } else {
          console.log("Thomas hade rätt")
        }
      })
      .catch(error => console.log(error))
  }

  componentDidMount() {
    this.fetchBooks()
  }

  componentDidUpdate() {
    console.log(this.state.title)
    //Skriver ut medan state ändras.
  }

  render() {
    console.log(this.state.books)
    return (
      <div className="App">
        <Header />
        <SubmitBook submitBook={this.submitBook} 
        titleHandler={this.titleHandler} 
        authorHandler={this.authorHandler}
        />
        <DisplayBooks books={this.state.books}
        />
      </div>
    )
  }
}

export default App
