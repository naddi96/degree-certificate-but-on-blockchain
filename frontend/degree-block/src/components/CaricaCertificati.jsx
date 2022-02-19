import React from "react";
import { Link, withRouter } from "react-router-dom";
import DegreeBlock from "../contracts/DegreeBlock.json";
import CaricaCertificato from "./CaricaCertificato";

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {children}
                <div class="text-center">
                <button class="btn btn-danger" type="button" onClick={handleClose}>
                    Close
                </button>
                </div>
            </section>
        </div>
    );
};



class CaricaCertificati extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            cert_list: [],
            abi: null,
            showPopup: false
        }
        this.openPopupHandler = this.openPopupHandler.bind(this);
        this.closePopupHandler = this.closePopupHandler.bind(this);
    }

    openPopupHandler = (degree) => {
        this.setState({
            showPopup: true,
            degree: degree
        });
    }

    closePopupHandler = () => {
        this.setState({ showPopup: false });
    }

    firma = async (contratto) => {
        console.log(contratto)
        let contract = new this.props.web3.eth.Contract(this.state.abi, contratto)
        contract.methods.sign().send({ from: this.props.account })
            .on("receipt", (receipt) => { alert("transazione ricevuta"); })
            .on("error", (error) => { alert("errore nella transazione"); });


    }

    async componentDidMount() {
        let contract = this.props.contract;
        this.setState({ abi: DegreeBlock.abi });
        contract.events.certificato_creato({ fromBlock: 0 }, this.loadCertificati);


    }


    loadCertificati = async (error, event) => {
        let cert_list = this.state.cert_list;
        let account = this.props.account;

        switch (this.props.load_case){
            case "docente_firmati":
                if (event.returnValues.commisione.includes(account)) {
                    let contract = new this.props.web3.eth.Contract(this.state.abi, event.returnValues.degree)
                    let has_signed = await contract.methods.has_signed(account).call()
                    if (has_signed) {
                        cert_list.push(event.returnValues);
                    }
                }
                break;
            case "docente_non_firmati":
                if (event.returnValues.commisione.includes(account)) {
                    let contract = new this.props.web3.eth.Contract(this.state.abi, event.returnValues.degree)
                    let has_signed = await contract.methods.has_signed(account).call()
                    if (!has_signed) {
                        cert_list.push(event.returnValues);
                    }
                }
                break;
            case "docente_tutti":
                if (event.returnValues.commisione.includes(account)) {
                    cert_list.push(event.returnValues);
                }
                break
            case "amministratore_tutti":
                cert_list.push(event.returnValues);
                break
        }

        //console.log(event.returnValues);


        this.setState({ cert_list: cert_list });
    }


    render() {
        let pulsante_firma=null
        let pulsante_dettafli=null
        let tipologia=null
        switch (this.props.load_case){
            case "docente_firmati":
                pulsante_firma=""
                pulsante_dettafli='Dettagli'
                tipologia='Certificati firmati dal docente'


                break;
            case "docente_non_firmati":
                tipologia='Certificati da firmare del docente'
                pulsante_firma=<button class="btn btn-primary"  onClick={() => this.firma(this.state.degree)}>Firma</button>
                pulsante_dettafli='Firma'
                break;
            case "docente_tutti":
                tipologia='Tutti i certificati del docente'
                pulsante_firma=""
                pulsante_dettafli='Dettagli'
                break
            case "amministratore_tutti":
                tipologia='Tutti i certificati'

                pulsante_firma=""
                pulsante_dettafli='Dettagli'
                break
        }



        let pop = null
        if (this.state.showPopup) {
            console.log("popup");
            pop = (<div>
                <CaricaCertificato web3={this.props.web3} certificato={this.state.degree} contract={this.props.contract} />
                <div class="text-center">
                {pulsante_firma}
                </div>
            </div>

            )

        }

        return (

            <div>
                <div>
                    <Modal show={this.state.showPopup} handleClose={this.closePopupHandler}>
                        {pop}


                    </Modal>
                </div>
                <div class='certificatiContainer'>
                <h1>{tipologia}</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Riferimento certificato</th>
                            <th>Laurea</th>
                            <th>{pulsante_dettafli}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.cert_list.map((cert, index) => (
                            <tr key={index}>
                                <td><Link to={"./cercaCertificato?certificato=" + cert.degree}>  {cert.degree}</Link> </td>
                                <td>{cert.laurea}</td>
                                <button class="btn btn-primary" onClick={() => this.openPopupHandler(cert.degree)}>{pulsante_dettafli}</button>                         
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
        );


    }


}





export default withRouter(CaricaCertificati);