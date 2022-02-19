
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
    console.log(this.state.certificato)
    if (this.state.certificato==="" || this.state.certificato === null){
    return(
        <div class="wrapper">
        
        <div class="input-group mb-3">
        
        <input type="text" class="form-control" aria-label="Inserisci l'id del certificato" aria-describedby="basic-addon2"  placeholder="Inserisci l'id del certificato" name="search" 
        onChange={e => this.setState({ certificato_inserito: e.target.value })}/>
        <button class="btn btn-outline-secondary" type="button" onClick={e => this.setState({certificato:this.state.certificato_inserito})} >Cerca</button>
        {this.state.certificato}
        </div></div>
    )}else{
        return(

            <div class="wrapper">
        
        <div class="input-group mb-3">
        
        <input type="text" class="form-control" aria-label="Inserisci l'id del certificato" aria-describedby="basic-addon2"  placeholder="Inserisci l'id del certificato" name="search" 
        onChange={e => this.setState({ certificato_inserito: e.target.value })}/>
        <button class="btn btn-outline-secondary" type="button" onClick={e => this.setState({certificato:this.state.certificato_inserito})} >Cerca</button>
           
           <CaricaCertificato web3={this.props.web3} certificato={this.state.certificato} contract={this.props.contract}/>
            
           
            </div></div>
            
            
        )


    }
    
}


} 

export default withRouter(CercaCertificato)