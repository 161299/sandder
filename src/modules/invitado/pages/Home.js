import React, {Fragment} from 'react'
import {NavLink} from 'react-router-dom'

import './../components/Main.css'


export default function Home() {

    // let scroll = window.requestAnimationFrame || function(callback){window.setTimeut(callback, 1000/60)}



    return (
        <Fragment>
        <main className="container_main">
            <section  className="image_main">
                <div className="banner">
                    <h1> <span>Sandder</span> Perú</h1> 
                    <p>producción de calzado de <span>cuero 100%</span></p>
                    <button className="btn-left" to="text-center" >Explorar</button>
                    <button className="btn-right"> <NavLink to="/loggin" >Iniciar Sesión</NavLink> </button>
                </div>
            </section>
        </main>   
        <section className="text-center">
            <h1>Grupo Sandder Perú 100% CALIDAD</h1> 
        </section>
        <section className="container_calzado">
            <div className="container_calzado_main">
                <div className="calzados">
                    <img src={require('./../images/02-calzado-zeus.jpg')} />
                </div>
                <div className="calzados">
                    <img src={require('./../images/01-calzado.jpg')} />
                </div>
                <div className="calzados">
                    <img src={require('./../images/thor.jpg')} />
                </div>
                <div className="calzados">
                    <img src={require('./../images/rex.jpg')} />
                </div>
            </div> 
        </section>

        </Fragment>
    )
}
