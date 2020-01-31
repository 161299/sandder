import React, { Component } from "react";
import * as firebase from 'firebase';
import Swal from 'sweetalert2';
var firebaseConfig = {
  apiKey: "AIzaSyDFh6SsbFn2Z0jbIY9Z8CflVe0_70TGg14",
  authDomain: "internet-do.firebaseapp.com",
  databaseURL: "https://internet-do.firebaseio.com",
  projectId: "internet-do",
  storageBucket: "internet-do.appspot.com",
  messagingSenderId: "524826378441",
  appId: "1:524826378441:web:d317fb142a5f2dbfcf8d18",
  measurementId: "G-N6K268K1GQ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

let storage = firebase.storage().ref();

export default class Firebase extends Component {
  
  constructor(props) {
     super(props);
     this.state= {
        archivo: undefined                  
     }                 
  }
            
                    
  cambiarImagen = (e) => {
    console.log(e.target.files[0]) 
    this.setState({
       archivo: e.target.files[0]                 
    });               
  }

  subirImagen = () => {
      Swal.fire({
         icon: 'info',
         text: 'Subiendo la imagen al servidor',
         allowOutsideClick: false,
         title: 'Guardando Cambios'
      })                
     let nombreArchivo = this.state.archivo.name;
//      poniendole un nombre a nuestro archivo
     let nombreFinal = +(new Date()) + '-' +nombreArchivo;
//      los headers para enviarselo a firebase
     let metadata = {
        contentType: this.state.archivo.type                 
     }
     storage.child('react-firebase/' + nombreFinal)
       .put(this.state.archivo, metadata).then((response)=>{
          console.log('Exito') 
          Swal.fire({
                    icon: 'success',
                    text: 'La imagen se ha subido con exito',
                    timer: 2000,
                    title: 'Exito'
                 })
          return response.ref.getDownloadURL()
       }).then(url => {
         console.log('actualizar state para enviar a la API')                  
         console.log(url)                  
       })                 
  }
  
  render() {
    return (
      <div>
        <label>Seleccionar Archivo</label>
        <input type="file"  onChange={this.cambiarImagen}  />
        <button  onClick={this.subirImagen}  >Subir a Firebase</button>
      </div>
    );
  }
}
