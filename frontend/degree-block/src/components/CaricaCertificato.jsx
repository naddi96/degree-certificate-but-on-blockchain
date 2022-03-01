
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
          contract:null,
        };
      }


    async componentWillReceiveProps(nextProps) {
        
        let cert=nextProps.certificato
        let web3=nextProps.web3
        
        let abi2=DegreeBlock.abi
        await this.setState({certificato:cert})

        try{

            let is_valid = await this.props.contract.methods.is_valid_certificate(this.state.certificato).call()
            if (!is_valid){
                throw new Error("Certificato non valido")
            }
    
            let contract= new web3.eth.Contract(abi2,this.state.certificato)  
            let results = await contract.methods.get_degree().call();
            let commisione=results.commisione
        
            let x;
            let dict_commissione={}
            for (let i=0;i<commisione.length;i++){
                let nome_cognome = await this.props.contract.methods.get_nome_cognome(commisione[i]).call()
                x = await contract.methods.has_signed(commisione[i]).call();
                if (nome_cognome===""){
                    nome_cognome="non impostato"
                }
                dict_commissione[commisione[i]]={signed:x,nome_cognome:nome_cognome}
    
            }
       
    
            await this.setState({certificato_scaricato:results, dict_commissione:dict_commissione,certificato_inesistenze:false})
                
            }catch{}
            
        
    }


    async componentDidMount() {
        
        let cert=this.props.certificato
        let web3=this.props.web3
      
        let abi2=DegreeBlock.abi

        
    
        await this.setState({certificato:cert})


        try{

        let is_valid = await this.props.contract.methods.is_valid_certificate(this.state.certificato).call()
        if (!is_valid){
            throw new Error("Certificato non valido")
        }

        let contract= new web3.eth.Contract(abi2,this.state.certificato)  
        let results = await contract.methods.get_degree().call();
        let commisione=results.commisione
    
        let x;
        let dict_commissione={}
        for (let i=0;i<commisione.length;i++){
            let nome_cognome = await this.props.contract.methods.get_nome_cognome(commisione[i]).call()
            x = await contract.methods.has_signed(commisione[i]).call();
            if (nome_cognome===""){
                nome_cognome="non impostato"
            }
            dict_commissione[commisione[i]]={signed:x,nome_cognome:nome_cognome}

        }
   

        await this.setState({certificato_scaricato:results, dict_commissione:dict_commissione,certificato_inesistenze:false})
            
        }catch{}
        
        
        
    }


 render(){
        if(this.state.certificato_scaricato!==null){
        let laurea = this.state.certificato_scaricato.laurea
        let nomeRealatore = this.state.certificato_scaricato.nomeRealatore
        let nomeLaureando= this.state.certificato_scaricato.nomeLaureando
        //let commisione= this.state.certificato_scaricato.commisione
        let codiceFiscaleLaureando=this.state.certificato_scaricato.codiceFiscaleLaureando
        let timestamp=this.state.certificato_scaricato.timestamp_creation
        let date= new Date(timestamp * 1000 )
        date = date.getDate() +"/"+ date.getMonth()+"/"+  date.getFullYear();
        
        return(
            <div>


<div className="row">
<div className="col-md-12">
    <div className="card">
        <div className="card-header">
            <h4>Certificato di laurea</h4>
        </div>
        <div className="card-body">
        <div className="form-group">
                    <label>id certificato:</label>
                    <div><b>{this.state.certificato}</b></div>
                </div>
                           <div className="form-group">
                    <label>Laurea in:</label>
                    <div><b>{laurea}</b></div>
                </div>
                <div className="form-group">
                    <label>Nome Cognome laureando:</label>
                    <div><b>{nomeLaureando}</b></div>
                </div>

                <div className="form-group">
                    <label>Codice Fiscale Laureando</label>
                    <div><b>{codiceFiscaleLaureando}</b></div>
                    
                </div>
                
                <div className="form-group">
                    <label>Nome Cognome Del Relatore</label>
                    <div><b>{nomeRealatore}</b></div>
                </div>

                <div className="form-group">
                    <label>Data Creazione</label>
                    <div><b>{date}</b></div>
                </div>
                
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Chiave Pubblica Docente</th>
                            <th>Nome Cognome</th>
                            <th>Ha firmato</th>
      
                        </tr>
                    </thead>
                    <tbody>

                            {Object.entries(this.state.dict_commissione).map(([key, value]) =>                                
                                
                                <tr>
                                <td key={key}>{key}</td>
                                <td key={key}>{value.nome_cognome} </td>
                                <td style={{background: value.signed ? "green": "red" }} key={key} >{ value.signed.toString()} </td>
                                </tr>
                               )        
                            }


                             
                            
                        </tbody>
                </table>


               </div></div></div></div> </div>


        )
        }
        if(this.state.certificato_inesistenze){
            return( <div>{this.state.certificato}  il certificato non esiste</div>)
        }
        return( <div>{this.state.certificato}</div>)
       
       
    }

}







export default withRouter(CaricaCertificato)