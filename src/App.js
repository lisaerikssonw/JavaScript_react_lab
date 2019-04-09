import React, { Component } from 'react'
import Header from './components/ui/Header/Header'
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
          this.setState({
            book: data
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
        <div className="container">
          <div className="row form-section">
            <form className="book-form col-6">
              <legend>Lägg till dina favoritböcker</legend>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  aria-describedby="title"
                  placeholder="Lägg till titel"
                />

                <input
                  type="text"
                  className="form-control"
                  id="author"
                  rows="3"
                  data-gramm="true"
                  data-txt_gramm_id="63b74fb6-c7e4-7f0e-0c1f-438d47ac87a0"
                  data-gramm_id="63b74fb6-c7e4-7f0e-0c1f-438d47ac87a0"
                  data-gramm_editor="true"
                  placeholder="Lägg till författare"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                Skicka
              </button>
            </form>
          </div>
        </div>
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
