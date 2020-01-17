import React, { Component, Fragment } from "react";
import {withRouter} from 'react-router-dom';
import {ProyectoService} from './../../../services/ProyectosService'
import './../components/ProyectoVer.css'
import Cargando from './../components/Cargando'
import { PresupuestoProyectoService } from "../../../services/PresupuestoProyectoService";
import PresupuestoVer from "./presupuesto/PresupuestoVer";

class ProyectoVer extends Component {

    constructor(props) {
        super(props);
        let {pro_id} = this.props.match.params;
        // console.log(prod_id);
        this.state = {
          cargando: true,
          pro_id : pro_id,
          proyecto : {},
          presupuesto: []
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


getPresupuestoByProId = (id) => {
  PresupuestoProyectoService.getPresupuestoByProyId(id)
  .then((data)=>{
    console.log(data.content);
    this.setState({
      presupuesto: data.content
    })
    
  })
  .catch((error)=>{
    console.log(error);
  })
}

componentDidMount(){
  this.verProyecto(this.state.pro_id)
  // console.log(this.props);
  this.getPresupuestoByProId(this.props.match.params.pro_id)
  
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
                      <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Ingresos y Gastos</a>
                      <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Presupuesto</a>
                    </div>
                  </nav>
                  <div class="tab-content" id="nav-tabContent">

                    <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                      Iran los ingresos y los gastos
                      <button className="btn btn-primary shadow mt-2"  onClick={()=>{
                        this.props.history.push(`/admin/trasaction/gasto-ingreso/${this.props.match.params.pro_id}`)
                      }}  >
                        Transacción
                      </button>
                    </div>

                    <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                      <div className="row">
                        <div className="col-md-12  text-right ">
                        <button className="btn btn-primary shadow mt-2"
                                onClick={()=>{
                                  
                                  this.props.history.push(`/admin/presupuesto-created/${this.props.match.params.pro_id}`)

                                }}>
                         Crear Presupuesto
                       </button>
                        </div>
                      </div>

                      <div className="row mt-2">
                        <div className="col-md-12">
                          {
                            this.state.presupuesto.length === 0 ?
                            <Cargando texto={'Cargando el presupuesto del proyecto'}  /> 
                            :
                            <PresupuestoVer  presupuesto={this.state.presupuesto}  />
                          }
                        </div>
                      </div>
                      
                    </div>
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

