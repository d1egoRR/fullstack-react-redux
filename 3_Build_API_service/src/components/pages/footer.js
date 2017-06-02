"use strict"
import React from 'react';
import {Nav, NavItem, Navbar, Badge} from 'react-bootstrap';

class Footer extends React.Component {
  render() {
    return(
      <footer className='footer text-center'>
        <div className='container'>
          <p className='footer-text'>
            Copyright Diegorr 2017
          </p>
        </div>
      </footer>
    )
  }
}

export default Footer;