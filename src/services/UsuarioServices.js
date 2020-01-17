import {url_backend} from './../environmet/environment' 
import { AuthService } from './Auth';

export class  UsuariosService{
    
       static async getUsuarios(){
         let _sAuth = new AuthService();
         let misHeaders = new Headers();
         misHeaders.append('Authorization', `Bearer ${_sAuth.token}`) 

        let config = {
          headers: misHeaders,
          method: 'GET'
        }

        let response = await fetch(`${url_backend}/usuarios`, config);
        let rpta = response.json()
        return rpta

       }
    }