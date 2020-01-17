import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class PresupuestoVer extends Component {


  render() {
    console.log(this.props);

    return (
      <table className="table">
        <thead>
          <th>Cantidad</th>
          <th>Unidad</th>
          <th>Total</th>
          <th>Recurso</th>
          <th>U. Medida</th>
        </thead>
        <tbody>
          {this.props.presupuesto.map(pre => {
            console.log("tabla");
            console.log(pre.pp_cant);
           return ( <tr  key={pre.pp_id}>
              <td>{pre.pp_cant}</td>
              <td> $ {pre.pp_uni}</td>
              <td> $ {pre.pp_tot}</td>
              <td>{pre.Recurso.rec_nom}</td>
              <td>{pre.unidadMedida.um_nom}</td>
            </tr>);
          })}
        </tbody>
      </table>
    );
  }
}

export default withRouter(PresupuestoVer);
