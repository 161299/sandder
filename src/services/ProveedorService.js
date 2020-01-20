import {url_backend} from './../environmet/environment' 
import { AuthService } from './Auth';

export class ProveedorService{

      static async getProveedores(){
        let _sAuth = new AuthService();   
        console.log(_sAuth.token);
                       
        let misHeaders = new Headers();
        misHeaders.append('Authorization', `Bearer ${_sAuth.token}`)
        
        let config = {
            headers: misHeaders,
            method: 'GET'                
        }            

        let response =  await fetch(`${url_backend}/proveedores`, config);
        let rpta = response.json()
        return rpta
       }     
    
    }   