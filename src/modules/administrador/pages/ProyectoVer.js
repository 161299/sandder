import React, { Component, Fragment } from "react";
import {withRouter} from 'react-router-dom';
import {ProyectoService} from './../../../services/ProyectosService'
import './../components/ProyectoVer.css'
import Cargando from './../components/Cargando'

class ProyectoVer extends Component {

    constructor(props) {
        super(props);
        let {pro_id} = this.props.match.params;
        // console.log(prod_id);
        this.state = {
          cargando: true,
          pro_id : pro_id,
          proyecto : {}
        }
}

verProyecto= (id)=>{
    ProyectoService.getProyectoById(id)
    .then((rpta)=>{
      if(rpta.ok){
        let data = rpta.content         
        this.setState({
          proyecto: data,
          cargando: false
        })
      } 
    })
    .catch((error)=>{
      console.log(error);  
    })
}

componentDidMount(){
  this.verProyecto(this.state.pro_id)
}




render() {
    let carga;
    if (this.state.cargando) {
      carga = <Cargando texto={"Cargando el proyecto"} />;
    }                 
    return (
      <Fragment>
        <main class="main">
          <div className="row">
            <div className="col-md-12">
              {
                carga ? carga : (
                  <Fragment>
                  <div class="card shadow">
                  <div className="card-head">
                  <h4> <strong>Nombre del proyecto :</strong> {this.state.proyecto.pro_nom}</h4>
                  </div>
                  <div className="card-body">
                    <p> <strong>fecha de inicio :</strong> {this.state.proyecto.pro_fechin}</p>
                    <p> <strong>fecha de fin del proyecto :</strong> {this.state.proyecto.pro_fechfin}</p>
                    <p> <strong>presupuesto :</strong> {this.state.proyecto.pro_pres}</p>
                    <p> <strong>estado del proyecto :</strong> {this.state.proyecto.pro_est == '1' ? 
                      (<span className="bagde badge-success" >Activo</span> ) : (
                        <span className="bagde badge-danger" >Desactivo</span>
                      )  
                  }</p>
                  </div>
                  </div>  
                  </Fragment>
                )              
              }
            </div>
          </div>
            <div className="row">
              <div className="col-md-12">
              <div className="card shadow">
                <div className="card-body">
                <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                      <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Ingresos</a>
                      <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Gastos</a>
                      <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Presupuesto</a>
                    </div>
                  </nav>
                  <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">Iran los ingresos</div>
                    <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">Iran los gastos</div>
                    <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">Iran los presuspuestos</div>
                  </div>
                </div>
              </div>  
              </div>
            </div>
        </main>
      </Fragment>
    );
  }
}

export default withRouter(ProyectoVer)

