import React, { Component } from 'react'
import Nav, { Link } from 'react-bootstrap/Nav'

class NavLinks extends Component {

    render() {

        return(
        <Nav className="mr-auto">
          <Link href="https://www.forverkliga.se/JavaScript/api/crud.php">
            API Docs
          </Link>
          <Link href="" onClick={this.props.getNewApiKey}>Get new API key</Link>
        </Nav>

        )
    }

}

export default NavLinks