import React, { Component, Fragment } from "react";
import Cargando from "../components/Cargando";
import { ProyectoService } from "../../../services/ProyectosService";
// import { MDBDataTable } from 'mdbreact';
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

// forzar a obtener los props  de router-dom
import {withRouter} from 'react-router-dom';


class Proyectos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proyectos: [],
      cargando: true,
      data: {}
    };
  }

  eliminarProyecto = (pro_id) => {
    Swal.fire({
      title: "¿Seguro que deseas eliminar?",
      text: "Los datos no podrán recuperarse",
      icon: "error",
      showCancelButton: true
    }).then(rpta => {
      if (rpta.value) {
        ProyectoService.deletProyectoById(pro_id).then(rpta => {
          if (rpta.ok) {
            this.getProyectos();
          }
        });
      }
    });
  };

  goVerProyecto= (pro_id)=>{
    this.props.history.push(`/admin/ver-proyecto/${pro_id}`)
  }

  getProyectos() {
    ProyectoService.getProyectos()
      .then(rpta => {
        // console.log(rpta);
        if (rpta.ok) {
          let dataNueva = { ...this.state.data };
          //   dataNueva.columns = [
          //       {label: 'Id', field: 'pro_id', sort: 'asc'},
          //       {label: 'Nombre', field: 'pro_nom', sort: 'asc'},
          //       {label: 'Presupuesto', field: 'pro_pres', sort: 'asc'},
          //       {label: 'Fecha Inicio', field: 'pro_fechin', sort: 'asc'},
          //       {label: 'Fecha Fin', field: 'pro_fechfin', sort: 'asc'},
          //       {label: 'Estado', field: 'pro_est', sort: 'asc'},
          //   ];
          dataNueva.columns = [
            { name: "Id", selector: "pro_id", sortable: true },
            { name: "Nombre", selector: "pro_nom", sortable: true },
            { name: "Presupuesto", selector: "pro_pres", sortable: true },
            { name: "Fecha Inicio", selector: "pro_fechin", sortable: true },
            { name: "Fecha Fin", selector: "pro_fechfin", sortable: true },
            { name: "Estado", selector: "pro_est", sortable: true },
            {
              name: "Acciones",
              cell: proyecto => {
                return (
                  <Fragment>
                  <button
                    className="btn btn-danger"
                    onClick={e => {
                      this.eliminarProyecto(proyecto.pro_id);
                    }}
                    style={{
                      marginRight: '10px'
                    }}
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={e => {
                      this.goVerProyecto(proyecto.pro_id);
                    }}
                  >
                    <i class="fas fa-eye"></i>
                  </button>
                  </Fragment>
                );
              },
              ignoreRowClick: true,
              allowOverflow: true,
              button: true
            }
          ];

          dataNueva.rows = [...rpta.content];
          // console.log(dataNueva);

          this.setState({
            cargando: false,
            proyectos: rpta.content,
            data: dataNueva
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getProyectos();
  }
  goCrearProyecto = () => {
    console.log('click');
    console.log(this.props);
    
    this.props.history.push('/admin/producto-created')
  }

  render() {
    // console.log(this.state.proyectos.pro_id)
    let carga;
    if (this.state.cargando) {
      carga = <Cargando texto={"Cargando los proyectos"} />;
    }

    return (
      <Fragment>
        <button className="btn btn-danger btn-modal shadow"
        style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            borderRadius: '50%',
        }} onClick={this.goCrearProyecto} >
            <i class="fas fa-plus"></i>    
        </button>  
        <main className="container">
          <div className="row">
            <div className="col-md-12">
              {/* {
                     carga ? carga: <MDBDataTable  
                                        striped
                                        bordered
                                        hover
                                        data = {this.state.data}
                                    />                
                  }                 */}

              {/* {carga ? (
                carga
              ) : (
                <DataTable
                  title="Arnold Movies"
                  columns={this.state.data.columns}
                  data={this.state.data.rows}
                  style={{
                    margin: '5rem 0px',
                  }}
                />
              )} */}
              <table className="table table-sm  table-hover " >
                <thead>
                  <tr>
                    <th>
                      <i className="fa fa-hashtag" aria-hidden="true"></i>
                      <span>Id</span>
                    </th>
                    <th>
                      <i className="fa fa-folder" aria-hidden="true"></i>
                      <span>Nombre</span>
                    </th>
                    <th>
                      <i className="fa fa-money" aria-hidden="true"></i>
                      <span>Presupuesto</span>
                    </th>
                    <th>
                      <i className="fa fa-calendar" aria-hidden="true"></i>
                      <span>Fecha de Inicio</span>
                    </th>
                    <th>
                      <i className="fa fa-calendar" aria-hidden="true"></i>
                      <span>Fecha de Fin</span>
                    </th>
                    <th>
                      <i className="fa fa-toggle-on" aria-hidden="true"></i>
                      <span>Estado</span>
                    </th>
                    <th>
                      <i className="fa fa-cog" aria-hidden="true"></i>
                      <span>Estado</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.proyectos.map(p=>{
                      return (
                        <tr>
                          <td>{p.pro_id}</td>
                          <td>{p.pro_nom}</td>
                          <td>{p.pro_pres}</td>
                          <td>{p.pro_fechin}</td>
                          <td>{p.pro_fechfin}</td>
                          <td>{p.pro_est === '1' ? (
                            <span className="badge badge-success">Activo</span>
                          ) : (
                            <span className="badge badge-danger">Desactivo</span>
                          ) }</td>
                          <td>
                            <button className="btn btn-danger mr-2"  onClick={()=>{
                              this.eliminarProyecto(p.pro_id)
                            }} >
                              <i className="fa fa-trash" aria-hidden="true"></i>
                            </button  >
                            <button className="btn btn-dark"  onClick={()=>{
                              this.goVerProyecto(p.pro_id)
                            }}>
                              <i className="fa fa-eye" aria-hidden="true"></i>
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </Fragment>
    );
  }
}

export default withRouter(Proyectos)  