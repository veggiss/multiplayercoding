import React, { Component } from 'react';
//import Game from './components/game';
import { NavLink } from 'react-router-dom';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

class Header extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <NavLink to='/play'>Play!</NavLink>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1}>
                Create challenge
              </NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1}>
                Profile
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>;
      </div>
    );
  }
}

export default Header;