import {url_backend} from './../environmet/environment' 
import { AuthService } from './Auth';

export class  PresupuestoProyectoService{

      static async getPresupuestoByProyId(id){
        let _sAuth = new AuthService();   
        console.log(_sAuth.token);
                       
        let misHeaders = new Headers();
        misHeaders.append('Authorization', `Bearer ${_sAuth.token}`)
        
        let config = {
            headers: misHeaders,
            method: 'GET'                
        }            

        let response =  await fetch(`${url_backend}/presupuestoproyecto/proyecto/${id}`, config);
        let rpta = response.json()
        return rpta
       }     


       static async postPresupuestoProyecto(data){
         let _sAuth = new AuthService();
         let misHeaders = new Headers();
         misHeaders.append('Authorization', `Bearer ${_sAuth.token}`)
         misHeaders.append('Content-Type', 'application/json') 

        let config = {
          headers: misHeaders,
          body: JSON.stringify(data),
          method: 'POST'
        }

        let response = await fetch(`${url_backend}/pp-varios`, config);
        let rpta = response.json()
        return rpta

       }
       


    }