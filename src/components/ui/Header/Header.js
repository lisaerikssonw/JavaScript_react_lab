import React from 'react'
import Navbar, { Brand, Toggle, Collapse } from 'react-bootstrap/Navbar'
import NavLinks from '../NavLinks'

export default props => (
  <header>
    <Navbar expand="lg" className="navbar-dark">
      <Brand href="#home">Laboration 2: JavaScript/React/AJAX - Jacob och Lisa</Brand>
      <Toggle aria-controls="basic-navbar-nav" />
      <Collapse id="basic-navbar-nav">
        <NavLinks getNewApiKey={props.getNewApiKey}/>
      </Collapse>
    </Navbar>
  </header>
)
