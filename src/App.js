import React, { Component } from 'react'
import Header from './components/ui/Header/Header'
import SubmitBook from './components/ui/SubmitBook'
import Book from './components/ui/Book'
import UserInfo from './components/ui/UserInfo'
import Footer from './components/ui/Footer'

const url = "https://www.forverkliga.se/JavaScript/api/crud.php?"

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      books: [],
      title: '',
      author: '',
      message: '',
      count: ''

    }

    this.titleHandler = this.titleHandler.bind(this)
    this.authorHandler = this.authorHandler.bind(this)
    this.submitBook = this.submitBook.bind(this)
    this.fetchBooks = this.fetchBooks.bind(this)
    this.request = this.request.bind(this)
    this.deleteBook = this.deleteBook.bind(this)
    this.getNewApiKey = this.getNewApiKey.bind(this)
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
    let apiKey = await this.requestApiKey()

    // Behöver inte använda await här eftersom callback körs när request är färdig
    // Att uppdatera state för title och author blir också överflödigt eftersom staten är redan up to date
    // Att lägga till id till state fyller inte heller någon direkt funktion - räcker med att id finns med i boken som läggs till i listan
    this.request(`op=insert&key=${apiKey}&title=${this.state.title}&author=${this.state.author}`, data => {
      this.setState({
        message: 'Book added!',
        books: [...this.state.books, { title: this.state.title, author: this.state.author, id: data.id }]
      })
    })
    
  }

  async deleteBook(id) {
    const apiKey = await this.requestApiKey()

    // Behöver inte använda await här eftersom callback körs när request är färdig
    this.request(`op=delete&key=${apiKey}&id=${id}`, () => {
      this.setState({
        message: 'Book deleted!',
        books: this.state.books.filter(book => book.id !== id)
      })
    })
  }

  request(qs, cb, limit = 10) {
    fetch(`${url}${qs}`)
      .then(response => response.json())
      .then(data => {
        if (data.status === "success") {
          if (cb) {
            this.setState({ count: 11 - limit, })
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

  // Finns ingen anledning att köra async här eftersom fetch inte returnerar någonting
  getNewApiKey() {
    fetch(`${url}requestKey`)
      .then(response => response.json())
      .then(data => {
        if (data.status === "success") {
          localStorage.setItem('apiKey', data.key)
          // Hämta lista på nytt här istället
          this.fetchBooks()
        } else {
          console.log("Thomas hade rätt")
        }
      })
      .catch(error => console.log(error))
  }

  async fetchBooks() {
    let apiKey = await this.requestApiKey()

    // Här behöver ni inte vänta in någonting heller alltså blir await överflödig här
    
    this.request(`op=select&key=${apiKey}`, data => {
      this.setState({
        books: data.data,
        message: "The books were successfully fetched"
      })
    })
  }

  componentDidMount() {
    this.fetchBooks()
  }

  render() {

    const bookList = this.state.books.map(book => {return(
      <Book {...book}  
      key={book.id}
      requestApiKey={this.requestApiKey}
      request={this.request}
      deleteBook={this.deleteBook}
      />
    )})

    return (
      <div className="App">
        <Header getNewApiKey={this.getNewApiKey} />
        <SubmitBook submitBook={this.submitBook}
          titleHandler={this.titleHandler}
          authorHandler={this.authorHandler}
        />
        <UserInfo message={this.state.message} count={this.state.count} />
        <div className="display-books">
                <div className="container">
                    <div className="col-12">
                        <ul className="list-group">
                        <li className="list-item list-group-item d-flex align-items-center">
                        <h4 className="title">Title</h4> <h4 className="author">Author</h4>
                        </li>
                            {bookList}
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
      </div>
    )
  }
}

export default App
