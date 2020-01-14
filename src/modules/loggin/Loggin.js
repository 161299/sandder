
import React, { Component , Fragment} from 'react'
import {Switch, Route} from 'react-router-dom';
import Login from './pages/Login'
import Register from './pages/Register'
import Recuperar from './pages/Recuperar'

export default class Loggin extends Component {

    constructor(props) {
        super(props);
        
    }
    

    render() {

        return (
            <Fragment>
                <Switch>
                    <Route path="/loggin/recoverpassword" render={()=>(<Recuperar/>)} />
                    <Route path="/loggin/registrar" render={()=>(<Register/>)} />
                    <Route path="/" render={()=>(<Login  loggin={this.props.loggin} />)} />
                </Switch>
            </Fragment>
        )
    }
}
