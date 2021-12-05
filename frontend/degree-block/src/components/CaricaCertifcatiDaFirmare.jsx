import React from "react";
import { Link, withRouter } from "react-router-dom";
import CreateDegree from "../contracts/CreateDegree.json";

class CaricaCertificatiDaFirmare extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
          cert_list:[],
        }
      }
    
    async componentDidMount() {
        let contract = this.props.contract;
        
        contract.events.certificato_creato({fromBlock: 0},this.loadCertificatiDaFirmare);
        

    }


    loadCertificatiDaFirmare = (error, event) => {
        let cert_list = this.state.cert_list;
        cert_list.push(event.returnValues);
        console.log(event.returnValues);
        this.setState({cert_list:cert_list});
    } 


    render(){
        return(
            <div>
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
                             
                   
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    
    
    }


}





export default withRouter(CaricaCertificatiDaFirmare);