import React, { Component, Fragment } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect
} from "react-router-dom";
import Invitado from './modules/invitado/Invitado';
import Loggin from './modules/loggin/Loggin';
import Administrador from './modules/administrador/Administrador';
import Footer from './components/Footer'
// import NotFound from './pages/NotFound'

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Router>
          <Switch>
            <Route path="/admin" render={()=>(<Administrador />)} />
            <Route path="/loggin" render={()=>(<Loggin />)} />
            {/* <Route path="/notfound" render={()=>(<NotFound/>)}/> */}
            <Route path="/" render={()=>(<Invitado/>)} />

            {/* <Route render={()=>{return ( <Redirect  to="/notfound"/>)}}/> */}
          </Switch>
        </Router>
        <Footer/>
      </Fragment>
    )
  }
}

