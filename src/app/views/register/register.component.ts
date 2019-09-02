import { Component, ViewChild } from '@angular/core';
import { Registro } from './register.model';
import { ApiService } from '../../api.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {Md5} from "md5-typescript";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

  @ViewChild('dangerModal', { static: false })
  public dangerModal: ModalDirective;

  @ViewChild('infoModal', { static: false })
  public infoModal: ModalDirective;

  registroForm = new FormGroup({
    nombreUsuario: new FormControl(''),
    clave: new FormControl(''),
    nombres: new FormControl(''),
    apellidos: new FormControl('')
  });

  public registro: Registro = new Registro("", "", "", "");
  public clave : string;
  public mensaje: string;

  constructor(public apiService: ApiService) { }


  public registroUsuario(){
    this.registro.clave = Md5.init(this.clave);
    console.log(this.registro);
    this.apiService.post("registro", this.registro).subscribe(x => {
      if(x['error'] === true){
        this.dangerModal.show();
        this.registro = x['mensaje'];
      }else{
        this.mensaje = 'Usuario creado correctamente, por favor inicie sesión';
        this.infoModal.show();
      }
    },error=>{
      this.mensaje = 'Error al establecer conexión con el servidor';
      this.dangerModal.show();
    });
  }


}
