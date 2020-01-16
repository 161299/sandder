import React, { Component, Fragment } from "react";
import {withRouter} from 'react-router-dom';
import {ProyectoService} from './../../../services/ProyectosService'
import './../components/ProyectoVer.css'


class ProyectoVer extends Component {

    constructor(props) {
        super(props);
        let {pro_id} = this.props.match.params;
        // console.log(prod_id);
        this.state = {
          pro_id : pro_id,
          proyecto : {}
        }
}

verProyecto= (id)=>{
  console.log('llllll');
    ProyectoService.getProyectoById(id)
    .then((rpta)=>{
      console.log(rpta);
      if(rpta.ok){
        let data = rpta.content 
        console.log(data);
        
        this.setState({
          proyecto: data
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
    console.log(this.props);
    console.log(this.state.proyecto);
                      
    return (
      <Fragment>
        <main class="main">
          <div class="cards">
            <div className="cards-title">
            <h2> <strong>Nombre del proyecto :</strong> {this.state.proyecto.pro_nom}</h2>
            </div>
              <p> <strong>fecha de inicio :</strong> {this.state.proyecto.pro_fechin}</p>
              <p> <strong>fecha de fin del proyecto :</strong> {this.state.proyecto.pro_fechfin}</p>
              <p> <strong>presupuesto :</strong> {this.state.proyecto.pro_pres}</p>
              <p> <strong>estado del proyecto :</strong> {this.state.proyecto.pro_est}</p>
          </div>
        </main>
      </Fragment>
    );
  }
}

export default withRouter(ProyectoVer)
