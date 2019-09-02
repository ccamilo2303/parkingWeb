import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * ADD @author Camilo
 *     @since  01/09/2019
 */

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL: string = 'http://localhost:8080/api/';

  /**
   * 
   * @param httpClient 
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * 
   * @param accion 
   * @param parametros 
   */
  public get(accion, parametros) {
    if (parametros) {
      return this.httpClient.get(this.apiURL + accion, parametros);
    }
    return this.httpClient.get(this.apiURL + accion);
  }

  /**
   * 
   * @param accion 
   * @param parametros 
   */
  public post(accion, parametros) {
    console.log("accion : "+accion, ' - ', parametros);
    return this.httpClient.post(this.apiURL + accion, parametros);
  }

  /**
   * 
   * @param accion 
   * @param parametros 
   */
  public put(accion, parametros) {
    return this.httpClient.put(this.apiURL + accion, parametros);
  }

  /**
   * 
   * @param accion 
   * @param parametros 
   */
  public delete(accion, parametros) {
    return this.httpClient.delete(this.apiURL + accion, parametros);
  }

}
