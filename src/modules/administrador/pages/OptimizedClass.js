import React, { Component, PureComponent } from "react";
import DataTable from "react-data-table-component";
import memoize from "memoize-one";
import { storiesOf } from "@storybook/react";
import { ProyectoService } from "../../../services/ProyectosService";

const columns = memoize(clickHandler => [
  {
    cell: () => <button onClick={clickHandler}>Action</button>,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true
  },
  {
    name: "Id",
    selector: "pro_id",
    sortable: true,
  },
  {
    name: "Nombre",
    selector: "pro_nom",
    sortable: true
  },
  {
    name: "Presupuesto",
    selector: "pro_pres",
    sortable: true,
    right: true
  },
  {
    name: "Fecha Inicio",
    selector: "pro_fechin",
    sortable: true,
    right: true
  },
  {
    name: "Fecha Fin",
    selector: "pro_fechfin",
    sortable: true,
    right: true
  },
  {
    name: "Estado",
    selector: "pro_est",
    sortable: true,
    right: true
  }
]);

export default class OptimizedClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  getProyectos() {
    ProyectoService.getProyectos()
      .then(rpta => {
        console.log(rpta);
        if (rpta.ok) {
            let dataNueva = {...this.state.data}                
            dataNueva = [
              { name: 'Nombre', selector: 'pro_nom', sortable: true  },  
              { name: 'Presupuesto', selector: 'pres', sortable: true  },  
              { name: 'Fecha Inicio', selector: 'pro_fechin', sortable: true  },  
              { name: 'Fecha Fin', selector: 'pro_fechfin', sortable: true  },  
              { name: 'Estado', selector: 'pro_est', sortable: true  },  
              {cell: (proyecto) => <button onClick={(e)=>{
                   this.eliminarProyecto(proyecto.pro_id)               
                   }}>Action</button>
              },
              ];  
            this.setState({
               data: dataNueva                 
            })                       
        }
      })
  }

  componentDidMount() {
    this.getProyectos();
    this.eliminarProyecto()
  }

  eliminarProyecto(id){
     console.log(id);
                      
  }

  handleChange() {
    console.log("state", this.state.selectedRows);

    this.setState({ selectedRows: this.state.selectedRows });
  };
  render() {
    return (
      <DataTable
        title="Libreria"
        data={this.state.data}
        columns={columns(this.handleButtonClick)}
        selectableRows
      />
    );
  }
}

// storiesOf('General', module)
//   .add('Optimized: Class', () => <OptimizedClass />);
