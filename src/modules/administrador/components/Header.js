import { NavLink } from "react-router-dom";
import './Header.css'
import logo from '../images/logo.png'

import React, { Component , Fragment} from 'react'

export default class Header extends Component {
    constructor(props) {
        super(props);
        
    }
    cerrarSesion = () =>{this.props.logout();}
    
    render() {
        return (
            <header>
            <div className="header-container">
                <div className="img"><NavLink className="display"  to="/"> <img  src={logo} /></NavLink></div>
                <nav className="nav">
                    <ul>
                        {/* <li><NavLink to={'/'} ><label><i class="fas fa-home"></i> Perfil</label></NavLink></li>
                        <li><NavLink to={'/nosotros'} ><label><i class="fas fa-street-view"></i> Administrador</label></NavLink></li> */}
                        <li><NavLink to={'/admin'} ><label><i class="fas fa-chalkboard-teacher"></i> Administrador</label> </NavLink></li>
                        <li><NavLink to={'/admin/perfil'} ><label><i class="fas fa-shoe-prints"></i> Perfil</label></NavLink></li>
                        <li><NavLink to={'/admin/proyectos'} ><label><i class="fas fa-shoe-prints"></i> Proyectos</label></NavLink></li>
                        <li><NavLink to={'/admin/libreria'} ><label><i class="fas fa-shoe-prints"></i> Libreria</label></NavLink></li>
                    </ul>
                </nav>
                <div className="buscador">
                    <form className="formulario-buscar">
                        {/* <input type="text" placeholder="Busca Aquí" /> */}
                            <button   onClick={this.cerrarSesion} >
                                Cerrar Sesión
                            </button>
                    </form>
                </div>
            </div>
        </header>
        )
    }
}

