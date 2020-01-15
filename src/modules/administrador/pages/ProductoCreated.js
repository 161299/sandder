import React, { Component, Fragment } from "react";
import { ProyectoService } from "../../../services/ProyectosService";
import Swal from "sweetalert2";

export default class ProductoCreated extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proyecto: {
        nombre: "",
        fecha_inicio: "",
        fecha_fin: "",
        presupuesto: "",
        estado: ""
      }
    };
  }

  actualizarState = e => {
    this.setState({
      proyecto: {
        ...this.state.proyecto,
        [e.target.name]: e.target.value
      }
    });
  };

  submit = e => {
    e.preventDefault();
    Swal.fire({
      title: "Creando Proyecto",
      text: "Estamos creando el proyecto",
      icon: "info",
      showCancelButton: false
    });
    ProyectoService.postProyecto(this.state.proyecto)
      .then(rpta => {
        if (rpta.ok) {
          Swal.fire({
            title: "Creado!",
            text: "El proyecto se ha creado exitosamente",
            icon: "success",
//             showCancelButton: true
          });
        }
        console.log(rpta);
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
      <Fragment>
        <main className="container">
          <div className="row justify-content-center mt-4">
            <div className="col-6">
              <form className="card" onSubmit={this.submit}>
                <div className="card-header bg-dark text-ligth text-center ">
                  <div className="card-title">
                    Formulario de creación del Proyecto
                  </div>
                </div>

                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre del Proyecto:</label>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          <i class="fas fa-project-diagram"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        name="nombre"
                        className="form-control"
                        placeholder="Ingrese Nombre del Proyecto"
                        id="nombre"
                        onChange={this.actualizarState}
                        value={this.state.proyecto.nombre}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="fecha_inicio">
                      Fecha de Inicio del Proyecto:
                    </label>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          <i class="far fa-clock"></i>
                        </span>
                      </div>
                      <input
                        type="date"
                        name="fecha_inicio"
                        className="form-control"
                        id="fecha_inicio"
                        onChange={this.actualizarState}
                        value={this.state.proyecto.fecha_inicio}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="fecha_fin">
                      Fecha de Fin del Proyecto:
                    </label>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          <i class="far fa-clock"></i>
                        </span>
                      </div>
                      <input
                        type="date"
                        name="fecha_fin"
                        className="form-control"
                        id="fecha_fin"
                        onChange={this.actualizarState}
                        value={this.state.proyecto.fecha_fin}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="presupuesto">
                      Presupuesto del Proyecto:
                    </label>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          <i class="fab fa-cc-diners-club"></i>
                        </span>
                      </div>
                      <input
                        type="number"
                        name="presupuesto"
                        className="form-control"
                        id="presupuesto"
                        onChange={this.actualizarState}
                        value={this.state.proyecto.presupuesto}
                        placeholder="Ingrese un monto en Soles"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="estado">Estado del Proyecto:</label>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          <i class="fas fa-unlock-alt"></i>
                        </span>
                      </div>
                      <select
                        name="estado"
                        className="form-control"
                        id="estado"
                        onChange={this.actualizarState}
                        value={this.state.proyecto.estado}
                      >
                        <option value="1">Activo</option>
                        <option value="0">Inactivo</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <button className="btn btn-block btn-dark" type="submit">
                    <i className="fas fa-plus mr-2"></i>
                    Crear Proyecto
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </Fragment>
    );
  }
}
