import React from 'react'
import Nav, { Link } from 'react-bootstrap/Nav'

// Här hade en functional component kommit väl till pass

const NavLinks = props => (
  <Nav className="mr-auto">
    <Link href="https://www.forverkliga.se/JavaScript/api/crud.php">
      API Docs
    </Link>

    {/* Här hade en Button varit bättre för ändamålet eftersom vi inte riktigt läknar till något här utan snarare utför en uppgift */}
    <button className="btn btn-warning" onClick={props.getNewApiKey}>Get new API key</button>
  </Nav>
)


export default NavLinks