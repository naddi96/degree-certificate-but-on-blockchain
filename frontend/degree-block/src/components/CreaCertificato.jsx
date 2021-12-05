//form react component

import React from "react";
import { Link, withRouter } from "react-router-dom";
import CreateDegree from "../contracts/CreateDegree.json";

class CreaCertificato extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            laurea: "",
            nome: "",
            relatore: "",
            commissione: [""],
            codicefiscale: "",

        }
    }

    creaCert = (e) => {
        


        if (this.state.laurea===""){
            alert("inserire la laurea")
            return;
        }
        if (this.state.nome===""){
            alert("inserire il nome")
            return;
        }
        if (this.state.relatore===""){
            alert("inserire il relatore")
            return;
        }
        if (this.state.codicefiscale===""){
            alert("inserire il codice fiscale")
            return;
        }

        //espressione regolare per il codice fiscale
        var re = /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/;
        if (!re.test(this.state.codicefiscale)) {
            alert("Codice fiscale non valido");
            return;
        }

        if (this.state.commissione.length===0){
            alert("inserire almeno una commissione")
            return;
        }
        
        for (let i = 0; i < this.state.commissione.length; i++) {

            // check if is a valid address
            if(!this.props.web3.utils.isAddress(this.state.commissione[i])){
                alert("inserire indirizzi della commissione validi")
                return;
            }
        }
        
        
   
        
        
        let contract = this.props.contract;
        console.log( this.props.account)
        console.log (                                this.state.laurea,
            this.state.nome,
            this.state.codicefiscale,
            this.state.relatore, 
            this.state.commissione)
        
        contract.methods.crea_certificato_di_laurea(
                                this.state.laurea,
                                this.state.nome,
                                this.state.codicefiscale,
                                this.state.relatore, 
                                this.state.commissione)
                                .send({from: this.props.account, value:0})
                    .on("receipt", (receipt) => { alert("transazione ricevuta"); })
                    .on("error", (error) => { alert("errore nella transazione"); });

    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Crea Certificato</h4>
                            </div>
                            <div className="card-body">
                               
                                    <div className="form-group">
                                        <label>Laurea in</label>
                                        <input type="text" className="form-control" placeholder="Inserire il corso di Laurea" value={this.state.laurea} onChange={(e) => this.setState({laurea: e.target.value})}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Nome Cognome laureando</label>
                                        <input type="text" className="form-control" placeholder="Inserire il nome e il cognome del laureando" value={this.state.nome} onChange={(e) => this.setState({nome: e.target.value})}/>
                                    </div>
                                    
                                    <div className="form-group">
                                        <label>Nome Cognome Del Relatore</label>
                                        <input type="text" className="form-control" placeholder="Inserire il nome e il cognome del Realatore" value={this.state.relatore} onChange={(e) => this.setState({relatore: e.target.value})}/>
                                    </div>

                                    <div className="form-group">
                                        <label>Codice Fiscale Laureando</label>
                                        <input type="text" className="form-control" placeholder="Inserire il nome e il codice fiscale del laureando" value={this.state.codicefiscale} onChange={(e) => this.setState({codicefiscale: e.target.value})}/>
                                    </div>
                                    
                                    <div className="form-group">
                                        <label>Chiavi pubbliche della commissione</label>
                                        {this.state.commissione.map((item, index) => {
                                            return(
                                                <div className="form-group" key={index}>
                                                    <input type="text" className="form-control" placeholder="Inserire la chiave pubblica" 
                                                    value={item} onChange={(e) => {
                                                        let app= this.state.commissione
                                                        app[index] = e.target.value
                                                        this.setState({commissione: app})}
                                                        }/>
                                                        <button onClick={e =>{
                                                            let app=this.state.commissione
                                                            app.splice(index, 1);
                                                            this.setState({commissione: app})
                                                        } }>elimina
                                                        </button>
                                                </div>
                                            )
                                        })}
                                        
                                        
                                        <button onClick={e =>{
                                            let app=this.state.commissione
                                            app.push("")
                                            this.setState({commissione: app})
                                        }
                                        } > aggiungi mebro commissione</button>
                                    </div>
                                    
                                   

                               </div></div></div></div>
                               
                               <button onClick={e =>{this.creaCert()}}>invia</button>
                               
                               </div>

                                          


        )
    
    
    }



  



} 

export default CreaCertificato