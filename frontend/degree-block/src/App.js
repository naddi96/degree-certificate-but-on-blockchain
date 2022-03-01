import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
//import DegreeBlock from "./contracts/DegreeBlock.json";
import Web3 from 'web3';
import CercaCertificato from "./components/CercaCertificato";
import CreateDegree from "./contracts/CreateDegree.json";
import CreaCertificato from "./components/CreaCertificatoAmministarore";
import Homepage from "./components/Homepage";
import NavigationDocente from "./components/NavigationDocente";
import NavigationAmministratore from "./components/NavigationAmministratore";

import CaricaCertificati from "./components/CaricaCertificati";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      contract: null,
      web3: null,
      metamasck: null,
    };
  }

  async componentDidMount() {
    if (await this.loadWeb3()) {
      await this.loadBlockchainData();
    }
  }


  async loadWeb3() {
    try {

      if (window.ethereum !== 'undefined') {
        window.web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          this.setState({ metamasck: true })
          return true

        } catch {
          this.setState({ metamasck: false })
          return false
        }
      } else if (window.web3 !== 'undefined') {
        window.web3 = new Web3(window.web3.currentProvider);
        this.setState({ metamasck: true })
        return true
      } else {
        this.setState({ metamasck: false })
        return false
      }
    } catch {

      return false
    }
  }








  async loadBlockchainData() {
    const web3 = await new Web3(window.web3.currentProvider);

    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    this.interval = setInterval(async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts[0] !== this.state.account) {
        this.setState({ account: accounts[0] });
      }
    }, 900);





    const networkId = await web3.eth.net.getId();
    const net_CreateDegree = CreateDegree.networks[networkId];
    if (net_CreateDegree) {
      const abi = CreateDegree.abi;
      const address_contract = net_CreateDegree.address;
      const contract_block = new web3.eth.Contract(abi, address_contract);

      this.setState({
        contract: contract_block,
        web3: web3
      })


      /*     console.log(contract_block)
          let x =contract_block.events.certificato_creato({fromBlock: 0},this.load_nft_model_event)
          console.log(x) */
      /*    let abi2=DegreeBlock.abi
           let contract= new web3.eth.Contract(abi2,"0x55d0987f868c890b8fbf91aca19cc7dd19be3c8f")  
          console.log(contract)
          let lastid = await contract.methods.get_degree().call();
          console.log(lastid)
     */

    } else {
      window.alert("Smart contract not deployed to detected network.");
    }
  }
  load_nft_model_event = (error, event) => {
    console.log(event.returnValues)

  }



  render() {
    if (
      this.state.account !== "" &&
      this.state.contract != null &&
      this.state.web3 != null
    ) {
      return (
        <div className="App">
          <Router>
            <Switch>

              {// <Route path="/" exact component={() => <Homepage />} />
              }
              <Route
                path="/"
                exact
                component={() => (
                  <div>
                    <Homepage />
                  </div>
                )}
              />

              <Route
                path="/cercaCertificato"
                exact
                component={() => (
                  <div>
                    <Navigation />

                    <CercaCertificato web3={this.state.web3} contract={this.state.contract} />
                  </div>
                )} />



              <Route
                path="/creaCertificato"
                exact
                component={() => (
                  <div>
                    <NavigationAmministratore />

                    <CreaCertificato web3={this.state.web3} account={this.state.account} contract={this.state.contract} />
                  </div>
                )} />


              <Route
                path="/certificatiDaFirmareDocente"
                exact
                component={() => (
                  <div>
                    <NavigationDocente contract={this.state.contract} account={this.state.account} />

                    <CaricaCertificati load_case={'docente_non_firmati'} web3={this.state.web3} account={this.state.account} contract={this.state.contract} />

                  </div>
                )} />



              <Route
                path="/certificatiFirmatiDocente"
                exact
                component={() => (
                  <div>
                    <NavigationDocente contract={this.state.contract} account={this.state.account} />

                    <CaricaCertificati load_case={'docente_firmati'} web3={this.state.web3} account={this.state.account} contract={this.state.contract} />

                  </div>
                )} />

              <Route
                path="/caricaCertifcatiDocente"
                exact
                component={() => (
                  <div>
                     <NavigationDocente contract={this.state.contract} account={this.state.account} />
                    <CaricaCertificati load_case={'docente_tutti'} web3={this.state.web3} account={this.state.account} contract={this.state.contract} />

                  </div>
                )} />


              <Route
                path="/visualizzaCertificati"
                exact
                component={() => (
                  <div>
                    <NavigationAmministratore/>
                    <CaricaCertificati load_case={'amministratore_tutti'} web3={this.state.web3} account={this.state.account} contract={this.state.contract} />

                  </div>
                )} />


            </Switch>
          </Router>
        </div>
      )
    } else {
      return (
        <div id="notfound">
        <div className="notfound">
        <div className="notfound-404">
        </div>
        <h2>Ops!! Sembra che tu non abbia un wallet</h2>
        <p>Installa un wallet come Metamask e <b>Ricordati di collegare il tuo account al sito!!</b></p>
        <a href="./">Try again :)</a>
        </div>
        </div>


      )
    }

  }
}

export default App;
