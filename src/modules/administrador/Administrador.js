import React, {Component , Fragment} from 'react';
import {Switch, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard'
import Perfil from './pages/Perfil'
import Header from './components/Header'
import Proyectos from './pages/Proyectos';
import OptimizedClass from './pages/OptimizedClass';
import ProductoCreated from './pages/ProductoCreated';
import ProyectoVer from './pages/ProyectoVer';
import PresupuestoCrear from './pages/presupuesto/PresupuestoCrear';


export default class Administrador extends Component {

    constructor(props) {
        super(props);   
    }
    

    render() {
        return (
            <Fragment>
                <Header  logout={this.props.logout} />
                <Switch>
                    <Route path="/admin/perfil" render={()=>(<Perfil />)} />
                    <Route path="/admin/proyectos" render={()=>(<Proyectos />)} />
                    <Route path="/admin/ver-proyecto/:pro_id" render={()=>(<ProyectoVer />)} />
                    <Route path="/admin/libreria" render={()=>(<OptimizedClass />)} />
                    <Route path="/admin/producto-created" render={()=>(<ProductoCreated />)} />
                    <Route path="/admin/presupuesto-created/:pro_id" render={()=>(<PresupuestoCrear />)} />
                    <Route path="/" render={()=>(<Dashboard />)} />
                </Switch>
            </Fragment>
        )
    }
}

