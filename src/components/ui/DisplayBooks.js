import React, {Component} from 'react'

class DisplayBooks extends Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        return (
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

        )
    }

}

export default DisplayBooks