import React, {Fragment} from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './pages/Login'
import Register from './pages/Register'
import Recuperar from './pages/Recuperar'


export default function Loggin() {
    return (
        <Fragment>
            <Switch>
                <Route path="/loggin/recoverpassword" render={()=>(<Recuperar/>)} />
                <Route path="/loggin/registrar" render={()=>(<Register/>)} />
                <Route path="/" render={()=>(<Login/>)} />
            </Switch>
        </Fragment>
    )
}
