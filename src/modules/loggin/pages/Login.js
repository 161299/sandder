import React, { Component, Fragment } from 'react'
import './Login.css'
import  fondo from     './../../../assets/video/source.gif'

export default class Login extends Component {
   
    constructor(props) {
        super(props);
        this.state= {
            correo: '',
            password: ''
        }
    }

    actualizarState = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
   

    iniciarSesion= (e) =>{
        e.preventDefault()
        this.props.loggin({...this.state});
    }
   
    render() {
        return (
            <Fragment>
            <div className="container-img">
            <img src={fondo} alt=""/>
            </div>
            <main className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-4 formulario">
                        <form onSubmit={this.iniciarSesion}>
                            <div className="form-group">
                                <label htmlFor="">Email :</label>
                                <input type="text" className="form-control" placeholder="qwerty@qwerty.com" name="correo" onChange={this.actualizarState} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Password :</label>
                                <input type="password" className="form-control" placeholder="********" name="password" onChange={this.actualizarState} />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-success btn-block" type="submit">
                                    Iniciar Sesión
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </Fragment>
        )
    }
}












    

