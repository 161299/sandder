import {url_backend} from './../environmet/environment' 

export class AuthService {
    token;

    constructor() {
       this.cargarToken();  
                        
    }
    
    cargarToken(){
      if(localStorage.getItem('token')){
        this.token = localStorage.getItem('token')                  
      }                  
    }

    guardarToken(token){
       this.token = token;                 
       localStorage.setItem('token', token)                 
    }     
    
    isLogged(){
       try {
          if(this.token){
            let payload = this.token.split('.')[1];  
            let payloadDecodificado = window.atob(payload);
            let payloadJSON = JSON.parse(payloadDecodificado);
            if(payloadJSON.exp > new Date()/1000){
               return true;        
            }else{
               console.log('el token ah expirado');
               localStorage.removeItem('token');                 
               return false                 
            }        
                     
          }else{
            return false;                  
          }                 

       } catch(error){
          localStorage.removeItem('token');
          return false                 
       }                 
    }

    async iniciarSesion(correo, password){
       let misHeaders = new Headers();
       misHeaders.append('content-type','application/json')                 
       let config = {
         method: 'POST',
         headers: misHeaders,    
         body: JSON.stringify({correo, password})            
       }
       let response = await fetch(`${url_backend}/login`, config);
       let rpta = await response.json();
       console.log(rpta.token);
//        if(rpta.token){
//           this.guardarToken()                 
//        }
       return rpta
                  
    }
    
    cerrarSesion(){
       localStorage.removeItem('token');
       this.token = null;                 
    }
}