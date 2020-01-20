import {url_backend} from './../environmet/environment' 
import { AuthService } from './Auth';

export class  GastoIngresoService{
    
       static async postTransaccion(data){
         let _sAuth = new AuthService();
         let misHeaders = new Headers();
         misHeaders.append('Authorization', `Bearer ${_sAuth.token}`)
         misHeaders.append('Content-Type', 'application/json') 

        let config = {
          headers: misHeaders,
          body: JSON.stringify(data),
          method: 'POST'
        }

        let response = await fetch(`${url_backend}/transaccion/gasto-ingreso`, config);
        let rpta = response.json()
        return rpta
       }
    }