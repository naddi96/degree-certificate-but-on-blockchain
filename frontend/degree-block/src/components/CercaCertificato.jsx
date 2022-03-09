
import React from "react";
import CaricaCertificato from "./CaricaCertificato";
import {  withRouter } from "react-router-dom";

class CercaCertificato extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          certificato: "",
          contract: null,
          certificato_inserito:""
        };
      }

    async componentDidMount() {
        const authResult = new URLSearchParams(window.location.search);
        const certificato = authResult.get("certificato");
        this.setState({certificato:certificato})
    }

    


render() {
    //console.log(this.state.certificato)
    if (this.state.certificato==="" || this.state.certificato === null){
    return(
        <div className="wrapper">
        
        <div className="input-group mb-3">
        
        <input type="text" className="form-control" aria-label="Inserisci l'id del certificato" aria-describedby="basic-addon2"  placeholder="Inserisci l'id del certificato" name="search" 
        onChange={e => this.setState({ certificato_inserito: e.target.value })}/>
        <button className="btn btn-outline-secondary" type="button" onClick={e => this.setState({certificato:this.state.certificato_inserito})} >Cerca</button>
        {this.state.certificato}
        </div></div>
    )}else{
        return(
            <>
            <div className="wrapper">
        
        <div className="input-group mb-3">
        
        <input type="text" className="form-control" aria-label="Inserisci l'id del certificato" aria-describedby="basic-addon2"  placeholder="Inserisci l'id del certificato" name="search" 
        onChange={e => this.setState({ certificato_inserito: e.target.value })}/>
        <button className="btn btn-outline-secondary" type="button" onClick={e => this.setState({certificato:this.state.certificato_inserito})} >Cerca</button>
           <br></br>

           
            
           
            </div>
            
            <CaricaCertificato web3={this.props.web3} certificato={this.state.certificato} contract={this.props.contract}/>
            </div>
            
            </>
            
        )


    }
    
}


} 

export default withRouter(CercaCertificato)