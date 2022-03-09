import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import logo from './images/logo.png';
import config from "../config";



const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="text-right">
                <button className="btn btn-danger" type="button" onClick={handleClose}>
                    Close
                </button>
                </div>
      </section>
    </div>
  );
};

class NavigationAmministartore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pub_key: "",
      showPopup: false
    }
    this.openPopupHandler = this.openPopupHandler.bind(this);
    this.closePopupHandler = this.closePopupHandler.bind(this);
  }


  openPopupHandler = () => {
    this.setState({ showPopup: true });
  }

  closePopupHandler = () => {
    this.setState({ showPopup: false });
  }


  set_pub_key = async (pub_key) => {
    try{
      await this.props.contract.methods.change_cordinatoreCorso(pub_key)
        .send({ from: this.props.account, value: 0 })
        .on("receipt", (receipt) => { alert("transazione ricevuta"); })
        .on("error", (error) => { alert("errore nella transazione"); });
    }catch(e){
      alert("indirizzo non valido");
    }
  }


  render() {

    let pop = ""
    if (this.state.showPopup) {
      //console.log("popup");
      pop = (
          <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Inserire l'indirizzo del nuovo cordinatore" value={this.state.pub_key} onChange={(e) => this.setState({ pub_key: e.target.value })} />
        <button className="btn btn-primary"  onClick={() => this.set_pub_key(this.state.pub_key)}>Invio</button>
      </div>

      )

    }



  return (
    <Navbar bg="navbar navbar-dark bg-dark" expand="lg">
    
    
    <Modal show={this.state.showPopup} handleClose={this.closePopupHandler}>
          {pop}
    </Modal>
    
    <Link className="navbar-brand" to={config.base_path}>
    <span> <img src={logo} width="30" height="30" alt=""/></span>
      <span> Certificati Laura</span>
      
    </Link>
    
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  

  <Navbar.Collapse id="basic-navbar-nav">
  
    <Nav className="mr-auto">
    
      <Link className="nav-link" to={config.base_path+"creaCertificato"}>
        Crea certificato di laurea
      </Link>
    
      <Link className="nav-link" to={config.base_path+"visualizzaCertificati"}>
        Visualizza tutti i cartificati
      </Link>

      
      <Link onClick={() => this.openPopupHandler()} className="nav-link">
        Cedi ruolo cordinatore
      </Link>      


    
    </Nav>
  </Navbar.Collapse>
  

</Navbar>
  );
}
}
export default withRouter(NavigationAmministartore);
