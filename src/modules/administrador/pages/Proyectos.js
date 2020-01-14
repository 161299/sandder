import React, { Component } from "react";
import Cargando from "../components/Cargando";
import { ProyectoService } from "../../../services/ProyectosService";
import { MDBDataTable } from 'mdbreact';


export default class Proyectos extends Component {

  constructor(props) {
      super(props);
      this.state = {
         proyectos : [] ,
         cargando: true,
         data :{}               
      }                 
  }
  

  getProyectos(){
    ProyectoService.getProyectos()
    .then((rpta)=>{
        console.log(rpta);     
        if(rpta.ok){
          let dataNueva = {...this.state.data};
          dataNueva.columns = [
              {label: 'Id', field: 'pro_id', sort: 'asc'},
              {label: 'Nombre', field: 'pro_nom', sort: 'asc'},
              {label: 'Presupuesto', field: 'pro_pres', sort: 'asc'},
              {label: 'Fecha Inicio', field: 'pro_fechin', sort: 'asc'},
              {label: 'Fecha Fin', field: 'pro_fechfin', sort: 'asc'},
              {label: 'Estado', field: 'pro_est', sort: 'asc'},
          ];
          
          dataNueva.rows = [...rpta.content]
          console.log(dataNueva);
          

          this.setState({
              cargando: false,
              proyectos: rpta.content,
              data: dataNueva
          })  
        }  
    })
    .catch((error)=>{
        console.log(error);
    })
  }

  componentDidMount(){
    this.getProyectos()
  }


  render() {
    let carga;                  
    if(this.state.cargando){
        carga = <Cargando texto={'Cargando los proyectos'} />                 
    }

    return (
       <main className="container">
           <div className="row">
              <div className="col-md-12">
                  {
                     carga ? carga: <MDBDataTable  
                                        striped
                                        bordered
                                        hover
                                        data = {this.state.data}
                                    />                
                  }                
              </div>
           </div>                
       </main>
    );
    }      

}

