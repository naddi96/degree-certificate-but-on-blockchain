
import React from "react";
import { Link } from "react-router-dom";
import "./styleHome.css";
import sign from "./images/sign.png";
import createIcon from "./images/create.png";
import search from "./images/search.jpg";



class Homepage extends React.Component{

render(){
   return(
   <div id="homepage">
    <div id="service" class="Services">
         <div class="container">
            <div class="row">
               <div class="col-md-12">
                  <div class="titlepage">
                     <h2>Benvenuto</h2>
                     <p>per favore seleziona una delle seguenti opzioni
                     </p>
                  </div>
               </div>
            </div>
            <div class="row">
               <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
               <Link to="/cercaCertificato">
                  <div class="Services-box">
                     <i><img src={search} alt="#" /></i>
                     <h3> Cerca Cartificato</h3>
                     <p>Inserisci il codice del tuo certificato e verifica se la tua laurea è cofermata</p>
                  </div>
               </Link>
               </div>
               <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                  <Link to="/certificatiDaFirmareDocente">
                  <div class="Services-box">
                     <i><img src={sign} alt="#" /></i>
                     <h3>Area Docente</h3>
                     <p>Area riservata al docente per confermare la seduta</p>
                  </div>
                  </Link>
               </div>
               <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
               <Link to="/creaCertificato">
                  <div class="Services-box">
                     <i><img src={createIcon} alt="#" /></i>
                     <h3>Area Amministratore</h3>
                     <p>Area riservata al cordinatore del corso per creare nuove sedute di laurea</p>
                  </div>
               </Link>
               </div>
               
               </div>
         </div>
      </div>
      </div>
   );
}
}

export default Homepage;