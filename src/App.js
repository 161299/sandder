import React, { Component, Fragment } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Invitado from './modules/invitado/Invitado';
import Loggin from './modules/loggin/Loggin';
import Administrador from './modules/administrador/Administrador';
import Footer from './components/Footer';
import {AuthService} from './services/Auth'
import Firebase from './components/Firebase';

export default class App extends  Component {

  _sAuth = new AuthService();

  constructor(props) {
    super(props);
    this.state={
      isLogged: false,
    }
  }

  loggin = (obj) => {
    console.log(obj);
    this._sAuth.iniciarSesion(obj.correo, obj.password)
                .then((rpta)=>{
                  console.log('promesa APP');
                  if(rpta.ok){
                    this._sAuth.guardarToken(rpta.token)
                    this.setState({
                      isLogged: true
                    })
                  }
                })
                .catch((error)=>{
                  console.log(error);               
                })
    
  }
  

  componentDidMount(){
    if(this._sAuth.isLogged()){
      console.log('usuario logeado');
    
      this.setState({
        isLogged: true
      })
      
    }
  }


  logout = () =>{
    this._sAuth.cerrarSesion();
    this.setState({
      isLogged: false
    })
  }



  render() {
    return (
      <Fragment>
        <Firebase />
        <Router>
          <Switch>
            <Route path="/admin" render={()=>{
              if(this._sAuth.isLogged()){
                return <Administrador  logout={this.logout} />
              }else{
                this.setState({
                  isLogged: false
                })
                return <Redirect to={'/loggin'} />
              }
            }} />
            <Route path="/loggin" render={()=>{
              if(this._sAuth.isLogged()){
                return <Redirect to={'/admin'} />
              }
              else{
                return <Loggin  loggin={this.loggin} />
              }
              }} />
            <Route path="/" render={()=>(<Invitado/>)} />
          </Switch>
        </Router>
        <Footer/>
      </Fragment>
    )
  }
}

