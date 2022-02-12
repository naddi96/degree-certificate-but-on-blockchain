import React from "react";
import { Button } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import DegreeBlock from "../contracts/DegreeBlock.json";
import CaricaCertificato from "./CaricaCertificato";

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};



class CaricaCertificati_Docente extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
          cert_list:[],
          abi:null,
          showPopup: false
        }
        this.openPopupHandler = this.openPopupHandler.bind(this);
        this.closePopupHandler = this.closePopupHandler.bind(this);
      }

    openPopupHandler = (degree) => {
    this.setState({showPopup: true,
                    degree:degree});
    }
    
    closePopupHandler = () => {
    this.setState({showPopup: false});
    }
    
    firma = async (contratto) => {
    console.log(contratto)
    let contract= new this.props.web3.eth.Contract(this.state.abi,contratto) 
    contract.methods.sign().send({from: this.props.account})
    .on("receipt", (receipt) => { alert("transazione ricevuta"); })
    .on("error", (error) => { alert("errore nella transazione"); });


}

    async componentDidMount() {
        let contract = this.props.contract;
        this.setState({abi:DegreeBlock.abi});
        contract.events.certificato_creato({fromBlock: 0}, this.loadCertificatiDaFirmare);
        

    }


    loadCertificatiDaFirmare =async (error, event) => {
        let cert_list = this.state.cert_list;
        
        
        
        let account=this.props.account;
        
        if (event.returnValues.commisione.includes(account)) {
            let contract= new this.props.web3.eth.Contract(this.state.abi,event.returnValues.degree) 
            cert_list.push(event.returnValues);
        } 

        //console.log(event.returnValues);


        this.setState({cert_list:cert_list});
    } 


    render(){

        let popup = null;
        let pop=null
        if(this.state.showPopup) {
            console.log("popup");
            pop= (<div>            
                <CaricaCertificato web3={this.props.web3} certificato={this.state.degree} contract={this.props.contract} />
                
                </div>

                )

        } 
        
        return(
            
            <div>
                <div>
                <Modal show={this.state.showPopup} handleClose={this.closePopupHandler}>
                    {pop}
                 
                 
                 </Modal>
                 </div>
                <h1>Certificati da firmare</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Riferimento certificato</th>
                            <th>Laurea</th>
                            <th>Commissione</th>
      
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.cert_list.map((cert, index) => (
                            <tr key={index}>
                                <td><Link to={"./cercaCertificato?certificato="+cert.degree}>  {cert.degree}</Link> </td>
                                <td>{cert.laurea}</td>
                                <td>{cert.commisione}</td>
                             
                                <button onClick={() =>  this.openPopupHandler(cert.degree) }>Dettagli</button>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    
    
    }


}





export default withRouter(CaricaCertificati_Docente);