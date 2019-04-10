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
    }

    this.componentDidMount = this.componentDidMount.bind(this)
    this.titleHandler = this.titleHandler.bind(this)
  }

  titleHandler(event) {
    this.setState({
      title: event.target.value
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

  fetchBooks() {
    let apiKey = this.requestApiKey()

    fetch(`${url}op=select&key=${apiKey}`)
      .then(request => request.json)
      .then(data => {
        console.log(data)
        this.setState({
          books: data.data
        })
      })
      .catch(error => console.log('error'))
  }

  componentDidMount() {
    
    this.fetchBooks()

  }

  componentDidUpdate() {
    console.log(this.state.title)
    //Skriver ut medan state ändras.
  }

  render() {
    return (
      <div className="App">
        <Header />
        <SubmitBook />
        <DisplayBooks />
      </div>
    )
  }
}

export default App
