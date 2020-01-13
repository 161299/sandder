import React from 'react'
import './Footer.css'
import logo from '../modules/invitado/images/logo.png'

export default function Footer() {
    return (
        <footer class="container-footer">
          <div className="footer-item" >
            <img src={logo}/>                   
          </div>
          <div className="footer-item" >
            <h3>ONDESARROLLO</h3>
            <p>
              Somos una agencia de desarrollo Web que ofrece servicios de presencia en Internet adaptándonos a sus necesidades y presupuesto. Somos profesionales titulados con más de 10 años de experiencia en el desarrollo de páginas web.
            </p>           
          </div>
          <div className="footer-item" >
            <h3>ÚLTIMAS ENTRADAS DEL BLOG</h3>
            <p>
              Checklist web: ¿Tienes todo preparado para desarrollar tu proyecto?
            </p>           
          </div>
          <div className="footer-item" >
            <h3>NUESTRA OFICINA EN HUELVA</h3>
            <p>
              Calle Méndez Núñez, 15 3B, 21001 Huelva
            </p>           
          </div>
        </footer>
    )
}
