import React from 'react';
import { NavLink } from "react-router-dom";
import './Header.css'
import logo from '../images/logo.png'

export default function Header() {
    return (
        <header>
            <div className="header-container">
                <div className="img"><NavLink className="display"  to="/"> <img  src={logo} /></NavLink></div>
                <nav className="nav">
                    <ul>
                        <li><NavLink to={'/'} ><label><i class="fas fa-home"></i> Inicio</label></NavLink></li>
                        <li><NavLink to={'/nosotros'} ><label><i class="fas fa-street-view"></i> Nosotros</label></NavLink></li>
                        <li><NavLink to={'/calzados'} ><label><i class="fas fa-shoe-prints"></i> Calzados</label></NavLink></li>
                        <li><NavLink to={'/trabaja-con-nosotros'} ><label><i class="fas fa-chalkboard-teacher"></i> Trabaja con nosotros</label> </NavLink></li>
                        <li><NavLink to={'/contacto'} ><label><i class="fas fa-id-badge"></i> Contacto</label></NavLink></li>
                    </ul>
                </nav>
                <div className="buscador">
                    <form className="formulario-buscar">
                        <input type="text" placeholder="Busca Aquí" />
                            <button type="submit">
                                <i className="fas fa-search"></i>
                            </button>
                    </form>
                </div>
            </div>
        </header>
            )
        }
