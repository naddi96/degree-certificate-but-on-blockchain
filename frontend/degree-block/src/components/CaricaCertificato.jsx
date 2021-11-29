
import React from "react";
import DegreeBlock from "../contracts/DegreeBlock.json";
import {  withRouter } from "react-router-dom";


class CaricaCertificato extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          certificato_scaricato: null,
          certificato_inesistenze:true,
          certificato:"",
        };
      }


    async componentWillReceiveProps(nextProps) {
        console.log("caricato")
        let cert=nextProps.certificato
        let web3=nextProps.web3
        console.log(web3)
        let abi2=DegreeBlock.abi
        await this.setState({certificato:cert})

        try{
        let contract= new web3.eth.Contract(abi2,this.state.certificato)  
        let results = await contract.methods.get_degree().call();
        await this.setState({certificato_scaricato:results, certificato_inesistenze:false})
            
        }catch{this.setState({certificato_scaricato:null})}
        
    }


    async componentDidMount() {
        console.log("caricato")
        let cert=this.props.certificato
        let web3=this.props.web3
      
        let abi2=DegreeBlock.abi
        await this.setState({certificato:cert})

        try{
        let contract= new web3.eth.Contract(abi2,this.state.certificato)  
        let results = await contract.methods.get_degree().call();
        await this.setState({certificato_scaricato:results, certificato_inesistenze:false})
            
        }catch{}
        
        
        
    }


    render(){
        if(this.state.certificato_scaricato!==null){
        let laurea = this.state.certificato_scaricato.laurea
        let nomeRealatore = this.state.certificato_scaricato.nomeRealatore
        let nomeLaureando= this.state.certificato_scaricato.nomeLaureando
        let commisione= this.state.certificato_scaricato.commisione
        let codiceFiscaleLaureando=this.state.certificato_scaricato.codiceFiscaleLaureando
        
        return(
            <div>{this.state.certificato}
            <div>Laurea in:  {laurea}</div>
            <div>Nome Relatore: {nomeRealatore}</div>
            <div>Nome Laureato{nomeLaureando}</div>
            <div>Commissione {commisione}</div>
            <div>Codice fiscale{codiceFiscaleLaureando}</div>

            </div>

        )
        }
        if(this.state.certificato_inesistenze){
            return( <div>{this.state.certificato}  il certificato non esiste</div>)
        }
        return( <div>{this.state.certificato}</div>)
       
       
    }

}







export default withRouter(CaricaCertificato)