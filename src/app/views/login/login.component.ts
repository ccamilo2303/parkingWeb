import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../../api.service';
import {Md5} from "md5-typescript";

/**
 * ADD @author Camilo
 *     @since  01/09/2019
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  @ViewChild('dangerModal', { static: false })
  public dangerModal: ModalDirective;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  public mensaje: string = '';
  

  constructor(public apiService: ApiService) {}

  /**
   * login
   */
  public login() {
    console.log("EMAIL : ", this.loginForm.value);

    if (this.loginForm.controls['email'].value === '' || this.loginForm.controls['password'].value === '') {
      this.mensaje = 'Todos los campos son requeridos';
      this.dangerModal.show();
      return;
    }
    
    this.apiService.get("login/"+this.loginForm.controls['email'].value+"/"+Md5.init(this.loginForm.controls['password'].value), null).subscribe(x =>{
      if(x['error'] === true){
        this.mensaje = x['mensaje'];
        this.dangerModal.show();
      }
    },error=>{
      this.mensaje = 'Error al establecer conexión con el servidor';
      this.dangerModal.show();
    });


  }

}
