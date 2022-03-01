import React from "react";
import { Link, withRouter } from "react-router-dom";
import {  Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import logo from './images/logo.png';

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


class NavigationDocente extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome_cognome: "",
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


  set_nome_cognome = async (nome_cognome) => {
    await this.props.contract.methods.set_nome_cognome(nome_cognome)
      .send({ from: this.props.account, value: 0 })
      .on("receipt", (receipt) => { alert("transazione ricevuta"); })
      .on("error", (error) => { alert("errore nella transazione"); });
  }



  render() {
    //console.log(this.props.contract)
    let pop = ""
    if (this.state.showPopup) {
      //console.log("popup");
      pop = (
          <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Inserire nome e cognome" value={this.state.nome_cognome} onChange={(e) => this.setState({ nome_cognome: e.target.value })} />
        <button className="btn btn-primary"  onClick={() => this.set_nome_cognome(this.state.nome_cognome)}>Invio</button>
      </div>

      )

    }

    return (
      <div>
        <Modal show={this.state.showPopup} handleClose={this.closePopupHandler}>
          {pop}


        </Modal>


        <Navbar bg="navbar navbar-dark bg-dark" expand="lg">


          <Link className="navbar-brand" to="/">
            <span> <img src={logo} width="30" height="30" alt="" /></span>
            <span> Certificati Laura</span>

          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />


          <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="mr-auto">

              <Link className="nav-link" to="./certificatiDaFirmareDocente">
                Firma Certificati
              </Link>

              <Link className="nav-link" to="./caricaCertifcatiDocente">
                Visualizza tutti i cartificati
              </Link>

              <Link className="nav-link" to="./certificatiFirmatiDocente">
                Visualizza tutti i cartificati firmati
              </Link>

              <Link onClick={() => this.openPopupHandler()} className="nav-link">
                Imposta il tuo nome e cognome
              </Link>


            </Nav>
          </Navbar.Collapse>


        </Navbar>
      </div>
    );
  }
}
export default withRouter(NavigationDocente);
