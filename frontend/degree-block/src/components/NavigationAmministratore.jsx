import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import logo from './images/logo.png';

function NavigationAmministartore(props) {
  return (
    <Navbar bg="navbar navbar-dark bg-dark" expand="lg">
    
    
    <Link className="navbar-brand" to="/">
    <span> <img src={logo} width="30" height="30" alt=""/></span>
      <span> Certificati Laura</span>
      
    </Link>
    
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  

  <Navbar.Collapse id="basic-navbar-nav">
  
    <Nav className="mr-auto">
    
      <Link className="nav-link" to="./creaCertificato">
        Crea certificato di laurea
      </Link>
    
      <Link className="nav-link" to="./visualizzaCertificati">
        Visualizza tutti i cartificati
      </Link>

      


    
    </Nav>
  </Navbar.Collapse>
  

</Navbar>
  );
}

export default withRouter(NavigationAmministartore);
