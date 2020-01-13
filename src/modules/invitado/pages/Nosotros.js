import React, {Fragment} from 'react'
import './../components/Nosotros/Main.css'

export default function Nosotros() {
    return (
        <Fragment>
        <div className="container-image">
            < div className="image-main">
                    <h3>Conoce más sobre <span>NOSOTROS</span></h3>
                    <button>Más información...</button>
             </div>
        </div>    
        <div className="container-mision">
            <article>
                <h1>Misión</h1>
                <p>Crear y ofrecer a nuestros clientes unas serie de calzados con diseños modernos  y exclusivos,basándose en la capacitación permanente de los mejores sistemas de producción, con la inversión de maquinarias de última tecnología, ofreciendo disposición en la atención al cliente con amabilidad y eficiencia creando así relaciones verdaderas donde ustedes son nuestra razón de ser.</p>
            </article>
        </div>
        <div className="container-image-02">
            <div className="image-02">

            </div>
        </div>
        </Fragment>
    )
}
