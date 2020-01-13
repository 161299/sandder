import React, {Fragment} from 'react';
import {Switch, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard'
import Perfil from './pages/Perfil'
import Header from './components/Header'

export default function Administrador() {
    return (
        <Fragment>
            <Header />
            <Switch>
                <Route path="/admin/perfil" render={()=>(<Perfil />)} />
                <Route path="/" render={()=>(<Dashboard />)} />
            </Switch>
        </Fragment>
    )
}
