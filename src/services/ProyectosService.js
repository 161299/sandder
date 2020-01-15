import {url_backend} from './../environmet/environment' 
import { AuthService } from './Auth';

export class ProyectoService{

      static async getProyectos(){
        let _sAuth = new AuthService();   
        console.log(_sAuth.token);
                       
        let misHeaders = new Headers();
        misHeaders.append('Authorization', `Bearer ${_sAuth.token}`)
        
        let config = {
            headers: misHeaders,
            method: 'GET'                
        }            

        let response =  await fetch(`${url_backend}/proyectos`, config);
        let rpta = response.json()
        return rpta
       }     
       
       static async deletProyectoById(pro_id) {
        let _sAuth = new AuthService();
    
        let misHeaders = new Headers();
        misHeaders.append("Authorization", `Bearer ${_sAuth.token}`);
    
        let config = {
          headers: misHeaders,
          method: 'DELETE'
        }
    
        let response = await fetch(`${url_backend}/proyecto/${pro_id}`, config);
        let rpta = response.json();
        return rpta;
      }

      static async postProyecto(data){
        let _sAuth = new AuthService();
        console.log(data);
        
        let misHeaders = new Headers();
        misHeaders.append("Authorization", `Bearer ${_sAuth.token}`);
        misHeaders.append('Content-Type', 'application/json')
        let config = {
          method: 'POST',
          body: JSON.stringify(data),
          headers: misHeaders
        }
        let response = await fetch(`${url_backend}/proyecto`, config);
        let rpta = response.json()
        return rpta
      }

      static async getProyectoById(id){
        let _sAuth = new AuthService();
        
        let misHeaders = new Headers();
        misHeaders.append('Authorization', `Bearer ${_sAuth.token}`);
        
        let config = {
          headers: misHeaders,
          method: 'GET'
        }
        let response = await fetch(`${url_backend}/proyecto/${id}`, config);
        let rpta = response.json()
        return rpta
      }


    }                     
