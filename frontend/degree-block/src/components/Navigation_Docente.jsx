import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';


function Navigation_Docente(props) {
  return (
    <Navbar bg="navbar navbar-dark bg-dark" expand="lg">
    
    
    <Link className="navbar-brand" to="/">
    <span> <img  width="30" height="30" alt=""/></span>
      <span> Certificati Laura</span>
      
    </Link>
    
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  

  <Navbar.Collapse id="basic-navbar-nav">
  
    <Nav className="mr-auto">
    
      <Link className="nav-link" to="./firmCertificato">
        Firma Certificati
      </Link>
    
      <Link className="nav-link" to="./firmCertificato">
        Visualizza tutti i cartificati
      </Link>

      <Link className="nav-link" to="./firmCertificato">
        Visualizza tutti i cartificati firmati
      </Link>



    
    </Nav>
  </Navbar.Collapse>
  

</Navbar>
  );
}

export default withRouter(Navigation_Docente);
