import React, { Component } from "react";
import Select from 'react-select'
import {withRouter} from 'react-router-dom';
import {RecursoService} from './../../../../services/RecursoService'
import { UnidadMedidaService } from "../../../../services/UnidadMedidaService";
import { PresupuestoProyectoService } from "../../../../services/PresupuestoProyectoService";
import Swal from 'sweetalert2'


class PresupuestoCrear extends Component {
  
  constructor(props) {
     super(props)
     let {pro_id} = this.props.match.params
     this.state = {
          formulario: {
             pp_cant: 0,
             pp_uni: 0,
             pp_tot: 0,
             pro_id: pro_id,
             um_id: 0,
             rec_id: 0,
             unidadesmedidas: '',
             recursos: '',                 
          },   
          recursos: [],
          unidadesmedidas: [],
          presupuestos: []                           
     }
  }
  

  traerAPIS = () => {
     Promise.all([  RecursoService.getRecursos(), 
                    UnidadMedidaService.getUnidadMedidas()  
                 ]).then((arrayApis)=>{
                     let recursos = arrayApis[0].content;
                     let unidadmedida = arrayApis[1].content
                     recursos= recursos.map((r=>({...r, value: r.rec_id, label: r.rec_nom}))) 
                     unidadmedida = unidadmedida.map((um=>({...um, value: um.um_id, label: um.um_nom}))) 
                     console.log(recursos);
                     console.log(unidadmedida);
                     
                     this.setState({
                         recursos: recursos,
                         unidadesmedidas: unidadmedida                
                     })
                                            
                 })                 
  }




  componentDidMount(){
        this.traerAPIS()
//         this.setFormulario(e)
        console.log(this.props)  
        
  }

  setFormulario= (e) =>{
           this.setState({
              formulario : {
                    ...this.state.formulario, 
                    [e.target.name] : e.target.value                

              }                 
           })                 
   }


   submit = (e) =>{
       e.preventDefault()
       
       let objPresupuesto = {
          ...this.state.formulario,
          pp_tot:  (+this.state.formulario.pp_cant *
                    +this.state.formulario.pp_uni 
                    ).toFixed(2)                 
       }
       console.log('submit');
       
       this.setState({
           presupuestos: [...this.state.presupuestos, objPresupuesto]                
       })  
   }

   createPresupuesto = () => {
       PresupuestoProyectoService.postPresupuestoProyecto(this.state.presupuestos)
       .then((rpta)=>{
           if(rpta.ok){
               Swal.fire({
                    title: 'Creación Exitosa !',
                    texto: 'Los presupuestos han sido registrados',
                    icon: 'success'
               }).then((rpta)=>{
                    if(rpta.value){
                       this.props.history.push(`/admin/ver-proyecto/${this.props.match.params.pro_id}`)  
                    }
               })              
           } 
       })
       .catch((error)=>{
            console.log(error);
       }) 
   }
  
  
  render() {
    return (
      <main className="container-fluid">
{/* titulo */}

         <div className="row mt-2">
             <div className="col-md-12">
                    <h2 className="display-5 ">Registrar Presupuesto del Proyecto</h2>
             </div>
         </div>   
{/* formulario */}
        <div className="row mt-3 ">
          <div className="col-md-12">
            <div className="card shadow">
              <div className="card-body">
                 
                 <form action=""  onSubmit={this.submit} >
                    <div className="row">
                         <div className="col-md-2">
                              <div className="form-group">
                                 <label htmlFor="pp_cant">Cantidad</label>                   
                                 <input type="number" 
                                 name="pp_cant"  
                                 id="pp_cant"  
                                 className="form-control" 
                                 placeholder="Ingrese cantidad"  
                                 value={this.state.formulario.pp_cant}
                                 onChange={this.setFormulario} />
                               </div>          

                         </div>
                         <div className="col-md-2">
                              <div className="form-group">
                                 <label htmlFor="pp_uni">Unidad</label>                   
                                 <input type="number" 
                                 name="pp_uni"  
                                 id="pp_uni"  
                                 className="form-control" 
                                 placeholder="Ingrese unidad"
                                 value={this.state.formulario.pp_uni} 
                                 onChange={this.setFormulario}/>
                               </div>          
                         </div>
                         <div className="col-md-2">
                              <div className="form-group">
                                 <label htmlFor="pp_total">Total</label>                   
                                 <input type="number" 
                                 name="pp_total"  
                                 id="pp_total"  
                                 className="form-control"  
                                 defaultValue={30} 
                                 disabled 
                                 value={
                                       +(+this.state.formulario.pp_uni * 
                                        +this.state.formulario.pp_cant).toFixed(2)                
                                 } />
                               </div>          
                         </div>
                         <div className="col-md-2">
                              <div className="form-group">
                                 <label htmlFor="pp_um">Unidad de Medida</label>                   
                                   <Select 
                                        options={this.state.unidadesmedidas} 
                                        onChange={(e)=>{ 
                                          console.log(e);
                                                       
                                             this.setState({
                                                 formulario: {
                                                     ...this.state.formulario,
                                                     um_id: e.um_id,
                                                     unidadesmedidas: e.um_nom,                
                                                 }                
                                             })               
                                        }}
                                        // value={this.state.formulario.um_id}
                                        />   
                               </div>          
                         </div>
                         <div className="col-md-2">
                               <div className="form-group">
                                  <label htmlFor="">Recurso :</label>
                                  <Select 
                                        options={this.state.recursos} 
                                        onChange={(e)=>{
                                             this.setState({
                                                 formulario: {
                                                     ...this.state.formulario,
                                                     rec_id: e.rec_id,
                                                     recursos: e.rec_nom                
                                                 }                
                                             })               
                                        }}
                                        />
                               </div>    
                         </div>
                         <div className="col-md-2">
                              <div className="form-group">
                               <label htmlFor=""></label>                   
                              <button  className="btn btn-block btn-dark"  type="submit" >
                                   <i class="fa fa-plus-square mr-2 " aria-hidden="true"></i>
                                   Agregar al presupuesto               
                              </button>     
                              </div>               
                         </div>               
                    </div>
                 </form>  

               </div>                    
            </div>                    
          </div>                  
        </div>
{/* Resultados  */}
         <div className="row mt-3">
             <div className="col-md-12">
                  <div className="card shadow">
                    <div className="card-body">
                       <table className="table table-bordered table-sm ">
                          <thead className="thead thead-dark" >
                               <tr className="text-center">
                                   <th>Cantidad</th>
                                   <th>P. Unitario</th>
                                   <th>Total</th>
                                   <th>U. Medida</th>
                                   <th>Recurso</th>                     
                               </tr>         
                          </thead> 

                          <tbody>
                               {
                                   this.state.presupuestos.map(pre => {
                                        return (
                                             <tr key={`${pre.um_id}${pre.rec_id}`} >
                                                 <td>{pre.pp_cant}</td>
                                                 <td>{pre.pp_uni}</td>
                                                 <td>{pre.pp_tot}</td>
                                                 <td>{pre.unidadesmedidas}</td>
                                                 <td>{pre.recursos}</td>                
                                             </tr>               
                                        )               
                                   })                
                               }
                          </tbody>

                       </table>  
                       <button className="btn btn-dark btn-block"  onClick={this.createPresupuesto} >
                           <i class="fas fa-save    "></i>
                           Crear Presupuesto     
                       </button>                  
                    </div>                    
                  </div>               
             </div>                           
         </div>
      </main>
    );
  }
}

export default withRouter(PresupuestoCrear)
