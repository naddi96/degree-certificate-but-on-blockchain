import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";

class App extends React.Component {
  

  
  render() {

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
                    <Navigation/>
                  </div>
                )}
              />
              




   

             

              
            </Switch>
          </Router>
        </div>
      );
   
  }
}

export default App;
