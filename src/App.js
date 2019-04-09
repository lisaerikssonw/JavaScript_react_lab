import React, { Component } from 'react'
import Header from './components/ui/Header/Header'
import SubmitBook from './components/ui/SubmitBook'
const url = "https://www.forverkliga.se/JavaScript/api/crud.php?"

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      books: [],
      title: '',
      author: ''
    }

    this.componentDidMount = this.componentDidMount.bind(this)
    this.titleHandler = this.titleHandler.bind(this)
  }
 
  titleHandler(event) {
    this.setState({
      title: event.target.value
    })
  }


  requestApiKey() {
    const apiKey = localStorage.getItem('apiKey')

    if (apiKey) {
      console.log(apiKey)
      return apiKey
    } else {
      const newApiKey = 
        fetch(`${url}requestKey`)
        .then(response => response.json())
        .then(data => data.key)
      localStorage.setItem('apiKey', newApiKey)
      return newApiKey
    }
  }

  componentDidMount() {
    const apiKey = this.requestApiKey
 
    fetch(`${url}op=select&key=${apiKey}`)
      .then(request => request.json)
      .then(data => {
        console.log(data)
          this.setState({
            books: data
          })
        })
        .catch(error => console.log('error'))
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
        <div className="display-books">
          <div className="container">
            <div className="col-12">
              <ul className="list-group">
                <li className="list-item list-group-item d-flex align-items-center">
                  <strong className="title">Titel</strong>

                  <div className="author">Författare</div>

                  <div className="buttons">
                    <button type="button" className="btn btn-success">
                      Editera
                    </button>
                    <button type="button" className="btn btn-danger">
                      Ta bort
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
