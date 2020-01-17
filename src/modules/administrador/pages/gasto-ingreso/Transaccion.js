import React, { Component } from "react";
import { UsuariosService } from "../../../../services/UsuarioServices";
import Select from 'react-select'


export default class Transaccion extends Component {
  
  constructor(props) {
       super(props);
       this.state = {
            transaccion: {
                                
               usu_id: 0                 
            },
            usuarios: '' 

       }               
  }
                    

  traerUsuarios = () => {
     UsuariosService.getUsuarios()
     .then((rpta)=>{
        console.log(rpta);
        this.setState({
            usuarios: rpta.content.usu_nom               
        })
                         
     })
     .catch((error)=>{
        console.log(error);
                         
     })               
  }

  componentDidMount(){
     this.traerUsuarios()
  }


  render() {
    return (
         <main>
             <div className="row mt-5 ">
                <div className="col-md-12">

                  <h4 >Campos del gasto / Ingreso</h4>

                  <div className="card">

                    <div className="card-body">
                       <div className="row">
                        <div className="col-md-4">
                             <div className="form-group">
                                    <label htmlFor="">Tipo :</label>                             
                                    <select name="criterio" 
                                            className="form-control" 
                                            id="criterio"
                    //                                            onChange={this.actualizarState}
                    //                                            value={this.state.transaccion.criterio}
                                            >
                                        <option value="gasto">gasto</option>
                                        <option value="ingreso">ingreso</option>
                                    </select>              
                              </div>            
                        </div>       

                        <div className="col-md-4">
                             <div className="form-group">
                                  <label htmlFor="">Fecha :</label>
                                  <input type="date"
                                         className="form-control"
                                         />                     
                             </div>                
                        </div>  

                        <div className="col-md-4">
                            <div className="form-group">
                               <label htmlFor="">Usuarios</label>
                                <Select 
                                    options={this.state.usuarios}
                                    onChange={(e)=>{
                                         this.setState({
                                              transaccion: {
                                                    ...this.state.transaccion,
                                                    usu_id: e.usu_id              
                                              }               
                                         })               
                                    }}
                                
                                />        
                            </div>                
                        </div>                                                                     
                       </div>                 
                    </div>

                  </div>

                </div>                    
             </div>                
         </main>           
    );
  }
}
