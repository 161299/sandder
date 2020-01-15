import React, { Component } from "react";
import {withRouter} from 'react-router-dom';

class ProyectoVer extends Component {

    constructor(props) {
        super(props);
        let {prod_id} = this.props.match.params;
        console.log(prod_id);
}


render() {
    console.log(this.props);
                      
    return <div>VerProyecto AQUI</div>;
  }
}

export default withRouter(ProyectoVer)
