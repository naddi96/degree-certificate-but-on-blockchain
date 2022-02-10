import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';


function Navigation(props) {
  return (
    <Navbar bg="navbar navbar-dark bg-dark" expand="lg">
    
    
    <Link className="navbar-brand" to="/">
    <span> <img  width="30" height="30" alt=""/></span>
      <span> Certificati Laura</span>
      
    </Link>
    
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  

  <Navbar.Collapse id="basic-navbar-nav">
  
    <Nav className="mr-auto">
    <Link className="nav-link" to="./cercaCertificato">
      Visualizza Certificato
      </Link>
    
      <Link className="nav-link" to="./firmCertificato">
        Area Docente
      </Link>
    
      <Link className="nav-link" to="./creaCertificato">
        Area Amministratore
      </Link>




    
    </Nav>
  </Navbar.Collapse>
  

</Navbar>
  );
}

export default withRouter(Navigation);
