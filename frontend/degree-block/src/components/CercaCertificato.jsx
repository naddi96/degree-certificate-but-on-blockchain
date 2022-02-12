
import React from "react";
import CaricaCertificato from "./CaricaCertificato";
import { Link, withRouter } from "react-router-dom";

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
        <><p>prooova</p>
        <input type="text" placeholder="Search.." name="search" 
        onChange={e => this.setState({ certificato_inserito: e.target.value })}/>
         <Link   to={"./cercaCertificato?certificato="+this.state.certificato_inserito}  >Cerca</Link> 
        <button onClick={e => this.setState({certificato:this.state.certificato_inserito})} >cerca </button>
        {this.state.certificato}
        </>
    )}else{
        return(
            <div>
           
            <input type="text" placeholder="Search.." name="search" 
        onChange={e => this.setState({ certificato_inserito: e.target.value })}/>
              
      
             <Link  to={"./cercaCertificato?certificato="+this.state.certificato_inserito}  >
                  <button onClick={e =>this.setState({certificato:this.state.certificato_inserito})} >cerca </button></Link>
            <CaricaCertificato web3={this.props.web3} certificato={this.state.certificato} contract={this.props.contract}/>
            
           
            </div>
            
            
        )


    }
    
}


} 

export default withRouter(CercaCertificato)