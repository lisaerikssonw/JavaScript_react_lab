import React, { Component } from 'react'
import Nav, { Link } from 'react-bootstrap/Nav'

class NavLinks extends Component {

    render() {

        return(
        <Nav className="mr-auto">
          <Link href="https://www.forverkliga.se/JavaScript/api/crud.php">
            API Docs
          </Link>
          <button type="button" className="btn" onClick={this.props.getNewApiKey}>Get new API key</button>
        </Nav>

        )
    }

}

export default NavLinks