import React, { Component } from "react";
import { UsuariosService } from "../../../../services/UsuarioServices";
import { ProveedorService } from "../../../../services/ProveedorService";
import { PresupuestoProyectoService } from "../../../../services/PresupuestoProyectoService";
import {GastoIngresoService} from './../../../../services/GastoIngresoService'
import Select from 'react-select'
import {withRouter} from 'react-router-dom'
import Swal from 'sweetalert2'
 class Transaccion extends Component {
  
  constructor(props) {
       super(props);
       let {pro_id} = this.props.match.params
       this.state = {
            formulario: {
                  objDocumento: {
                     doc_tipo: '',
                     doc_total: 0,
                     doc_obs: '',
                     doc_fech: '',
                     prov_id: ''
                  },
                  objGastoIngreso: {
                     gasin_fech: '',
                     gasin_crit: '',
                     usu_id: '',
                     pro_id: pro_id
                  },
                  arrDocumentoDetalle:  [
                     {
                     docd_cant : 0,
                     docd_punit: 0,
                     docd_tot: 0,
                     pp_id: ''
                     }
                  ]
               
            },
            usuarios: [],
            proveedores: [],
            presupuestos: [],
            ok: false

       }               
  }
                    

  

  traerUsuProvePre = (id) => {
   Promise.all([  UsuariosService.getUsuarios(), 
      ProveedorService.getProveedores(),
      PresupuestoProyectoService.getPresupuestoByProyId(id) 
   ]).then((arrayApis)=>{
       let usuarios = arrayApis[0].content;
       let proveedores = arrayApis[1].content;
       let presupuestos = arrayApis[2].content
       usuarios= usuarios.map((usu=>({...usu, value: usu.usu_id, label: usu.usu_nom}))) 
       proveedores = proveedores.map((prov=>({...prov, value: prov.prov_id, label: prov.prov_rz}))) 
       presupuestos = presupuestos.map((pre=>({...pre, value: pre.pp_id, label:`${pre.Recurso.rec_nom}   -   ${pre.unidadMedida.um_nom}` }))) 

       
       this.setState({
           usuarios: usuarios,
           proveedores: proveedores,
           presupuestos: presupuestos,               
       })
                              
   }) 
  }


  setFormulario = (e) => {
   console.log(e.target);
   
   this.setState({
      formulario: {
         ...this.state.formulario,
         objDocumento: {
            ...this.state.formulario.objDocumento,
            [e.target.name]: e.target.value
         }
       }
   })
  }

  setFormularioGastoIngreso = (e) => {
     this.setState({
        formulario: {
           ...this.state.formulario,
           objGastoIngreso: {
              ...this.state.formulario.objGastoIngreso,
              pro_id: this.props.match.params.pro_id,
              [e.target.name]: e.target.value
           }
        },
        ok: true
     })
  }

  setForDocumentoDetalle = (e) => {
   this.state.formulario.arrDocumentoDetalle.map(arrDocumentoDetalle => {
      this.setState({
         formulario: {
            ...this.state.formulario,
            arrDocumentoDetalle: [{
               ...arrDocumentoDetalle,
               [e.target.name] : e.target.value,
            }]
         }
      })
   })
  }




  componentDidMount(){
     let {pro_id} = this.props.match.params
     this.traerUsuProvePre(pro_id)
   //   this.restaPreDocuDe(this.state.presupuestos.docd_tot, this.state.formulario.arrDocumentoDetalle.docd_tot)

  }

  submit = (e) => {
      e.preventDefault();
      this.state.formulario.arrDocumentoDetalle.map(arrDocumentoDetalle => {
         let docd_tot = +(+arrDocumentoDetalle.docd_cant * +arrDocumentoDetalle.docd_punit).toFixed(2)

         this.setState({
            formulario: {
               ...this.state.formulario,
               arrDocumentoDetalle: [{
                  ...arrDocumentoDetalle,
                  docd_tot: docd_tot
               }]
            }
         })
      })
      

  }

  postConDocDetalle = () => {
      GastoIngresoService.postTransaccion(this.state.formulario)
        .then(rpta => {
          if (rpta.ok) {
            Swal.fire({
              title: "Creado!",
              text: "Función exitosa",
              icon: "success",
  //             showCancelButton: true
            });
            console.log(rpta);
          }
        })
        .catch(error => {
          console.log(error);
        });
  }




   options = [
   { value: 'gasto', label: 'gasto' },
   { value: 'ingreso', label: 'ingreso' }
  ]
  render() {

    return (
         <main>
            <form onSubmit={this.submit} >
            <div className="row mt-5 ">
                <div className="col-md-12">

                  <h4 >Campos del gasto / Ingreso</h4>

                  <div className="card">

                    <div className="card-body">
                       <div className="row">
                        <div className="col-md-4">
                             <div className="form-group">
                                    <label htmlFor="">Tipo :</label>                             
                                    <Select 
                                    options={this.options}
                                    onChange={(e)=>{
                                       console.log('asdasdasd');
                                       
                                       console.log(e);
                                       
                                       console.log(e.value);
                                       this.setState({
                                          formulario: {
                                             ...this.state.formulario,
                                             objGastoIngreso: {
                                                ...this.state.formulario.objGastoIngreso,
                                                gasin_crit: e.value
                                             }
                                          }
                                       })
                                    }}
                                />               
                              </div>            
                        </div>       

                        <div className="col-md-4">
                             <div className="form-group">
                                  <label htmlFor="">Fecha :</label>
                                  <input type="date"
                                         className="form-control"
                                         name = "gasin_fech"
                                         id="gasin_fech"
                                         placeholder="ingrese fecha"
                                         onChange={this.setFormularioGastoIngreso} 
                                             />                     
                             </div>                
                        </div>  

                        <div className="col-md-4">
                            <div className="form-group">
                               <label htmlFor="">Usuarios</label>
                                <Select 
                                    options={this.state.usuarios}
                                    onChange={(e)=>{
                                       console.log(e.usu_id);
                                       this.setState({
                                          formulario: {
                                             ...this.state.formulario,
                                             objGastoIngreso: {
                                                ...this.state.formulario.objGastoIngreso,
                                                usu_id: e.usu_id,
                                             }
                                          },
                                          // usuarios: e.usu_nom
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
             <div className="row mt-5 ">
                <h4>Documento</h4>
                <div className="col-md-12" >
                    <div className="row">
                       <div className="col-md-4" >
                          <div class="form-group">
                            <label htmlFor="doc_tipo">Tipo</label>
                            <input type="text" 
                                   name="doc_tipo" 
                                   id="doc_tipo" 
                                   class="form-control" 
                                   placeholder="Ingrese tipo de documento" 
                                 //   value={this.state.formulario.objDocumento.doc_tipo}
                                   onChange={this.setFormulario}
                                   />
                          </div>
                          {
                             this.state.formulario.objGastoIngreso.gasin_crit === 'gasto' ?
                              ( 
                              // console.log('gasto'),
                                this.state.ok ? 
                                (
                              <div class="form-group">
                                 <label htmlFor="doc_total">Total</label>
                                 <input type="number" 
                                        name="doc_total" 
                                        id="doc_total" 
                                        class="form-control"  
                                        aria-describedby="helpId" 
                                       //  disabled 
                                        onChange={this.setFormulario}
                                        />
                               </div>                                 
                                ) : (<div></div>)
                                 
                              )
                             :
                             (
                             
                                 <div class="form-group">
                                   <label htmlFor="doc_total">Total</label>
                                   <input type="number" 
                                          name="doc_total" 
                                          id="doc_total" 
                                          class="form-control"  
                                          aria-describedby="helpId" 
                                          placeholder="$ 00.00"
                                          onChange={this.setFormulario}
                                          />
                                 </div>
                                
                             )
                          }
                       </div>
                       <div className="col-md-4" >
                            <div class="form-group">
                              <textarea name="doc_obs"  
                                        id="doc_obs" 
                                        rows="4" cols="75" 
                                        className="form-control"
                                        placeholder="observación........" 
                                       //  value={this.state.formulario.objDocumento.doc_obs}
                                        onChange={this.setFormulario}
                                        >
                                 
                              </textarea>
                            </div>  
                            <div class="form-group">
                              <label htmlFor="doc_fech">Fecha</label>
                              <input type="date" 
                                     name="doc_fech" 
                                     id="doc_fech" 
                                     class="form-control" 
                                     aria-describedby="helpId"
                                    //  value={this.state.formulario.objDocumento.doc_fech}
                                     onChange={this.setFormulario}
                                     />
                            </div>      
                       </div>
                       <div className="col-md-4" >
                           <div class="form-group">
                             <label htmlFor="prov_id">Proveedor</label>
                             <Select 
                                    options={this.state.proveedores}
                                    onChange={(e)=>{
                                       console.log(e.prov_id);
                                       this.setState({
                                          formulario: {
                                             ...this.state.formulario,
                                             objDocumento: {
                                                ...this.state.formulario.objDocumento,
                                                prov_id: e.prov_id,
                                             },
                                          }
                                       })
                                    }}
                                />    
                           </div>         
                       </div>
                    </div>                
                </div>
             </div>
             <div className="row  mt-5" >
               <div className="col-md-12" >
                  { 

                     this.state.formulario.objGastoIngreso.gasin_crit === 'gasto' ? (
                        <div className="row" >
                           <h4>Documento Detalle</h4>
                           <div className="col-md-3"  >
                              <div class="form-group">
                                <label htmlFor="docd_cant">Cantidad</label>
                                <input type="number" 
                                       name="docd_cant" 
                                       id="docd_cant" 
                                       class="form-control" 
                                       placeholder="Ingrese cantidad" 
                                       onChange={this.setForDocumentoDetalle}
                                       value={this.state.formulario.arrDocumentoDetalle.docd_cant}
                                       />
                              </div>
                           </div>
                           <div className="col-md-3"  >
                             <div class="form-group">
                                <label htmlFor="docd_punit">P. Unitario</label>
                                <input type="number" 
                                       name="docd_punit" 
                                       id="docd_punit" 
                                       class="form-control" 
                                       placeholder="Ingrese el precio Unitario" 
                                       onChange={this.setForDocumentoDetalle}
                                       value={this.state.formulario.arrDocumentoDetalle.docd_punit}
                                       />
                              </div>
                           </div>
                           <div className="col-md-3"  >
                           <div class="form-group">
                                <label htmlFor="docd_tot">Total</label>
                                <input type="text" 
                                       name="docd_tot" 
                                       id="docd_tot" 
                                       class="form-control" 
                                       disabled
                                       onChange={this.setForDocumentoDetalle}
                                       // defaultValue={
                                       //    this.state.formulario.arrDocumentoDetalle.map(arrDocumentoDetalle => {
                                       //       return (+(+arrDocumentoDetalle.docd_cant * +arrDocumentoDetalle.docd_punit))
                                       //    })
                                       // }
                                       value={this.submit ? 
                                          this.state.formulario.arrDocumentoDetalle.map(arrDocumentoDetalle => {
                                             return (+(+arrDocumentoDetalle.docd_cant * +arrDocumentoDetalle.docd_punit).toFixed(2))
                                          })
                                          : this.state.formulario.arrDocumentoDetalle.docd_tot 
                                       } 
                                       />
                                    />
                              </div>
                           </div>
                           <div className="col-md-3"  >
                           <label htmlFor="pp_id">Presupuesto</label>
                              <Select  
                                 options={this.state.presupuestos}              
                                 onChange={(e)=>{
                                    let arrDocumentoDetalle = this.state.formulario.arrDocumentoDetalle.map(arrDocumentoDetalle => {
                                       this.setState({
                                          formulario: {
                                             ...this.state.formulario,
                                             arrDocumentoDetalle: [{
                                                ...arrDocumentoDetalle,
                                                pp_id : e.pp_id
                                             }]
                                          }
                                       })
                                    })                                    
                                 }}
                              />
                           </div>
                        </div>
                     ):(
                        console.log('no es igual')
                        
                     )

                  }                  
               </div>
             </div>                          
             <div className="row mt-4 justify-content-center " >
                <div className="col-md-4" >
                   <button className="btn btn-primary btn-block" type="submit" >
                      Añadir
                   </button>
                </div>
                <div className="col-md-6" >
                   <button className="btn btn-dark btn-block" onClick={this.postConDocDetalle} >
                      Finalizar
                   </button>
                </div>
             </div>


            </form>
      
         </main>           
    );
  }
}

export default withRouter(Transaccion)