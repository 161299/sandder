import React, {Fragment} from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './pages/Home'
import ProyectoVer from './pages/ProyectoVer'
import Contacto from './pages/Contacto'
import Header from './components/Header';
import Calzados from './pages/Calzados';
import TrabajaConNosotros from './pages/TrabajaConNosotros';
import Nosotros from './pages/Nosotros';

export default function Invitado() {
    console.log('invitado');
    let hola = () => {
        let holi = "holis"
        return holi
    }
    
    return (
        <Fragment>
            <Header />
            <Switch>
                <Route path="/nosotros" render={()=>(<Nosotros />)} />
                <Route path="/contacto" render={()=>(<Contacto />)} />
                <Route path='/proyectos/:id' render={()=>(<ProyectoVer hola={hola}  />)} />
                <Route path="/calzados" render={()=>(<Calzados />)} />
                <Route path="/trabaja-con-nosotros" render={()=>(<TrabajaConNosotros />)} />
                <Route path="/" render={()=>(<Home />)} />
            </Switch>
        </Fragment>
    )
}
