import { Component } from '@angular/core';
import { Persona } from 'src/app/domain/persona';
import { AuthService } from 'src/app/services/auth-service';
import { LoginServices } from 'src/app/services/login-services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  mostrarRegistro: boolean = false;
  email: any
  password: any
  per : Persona = new Persona()
  constructor(private loginServices : LoginServices, private authService : AuthService){}
  mostrarFormularioRegistro(event: Event) {
    event.preventDefault();  // Evita el comportamiento predeterminado del enlace
    this.mostrarRegistro = true;
  }

  mostrarFormularioLogin(event: Event) {
    event.preventDefault();  // Evita el comportamiento predeterminado del enlace
    this.mostrarRegistro = false;
  }

  login() {
    if(this.validarCamposLogin()){
      if (this.per.correo && this.per.contra) {
        this.authService.login(this.per.correo, this.per.contra)
          .subscribe(response => {
            alert("INGRESADO");
            this.authService.setUsuarioAutenticado(response);
          }, error => {
            console.error(error);
            alert("ERROR");
          });
      } else {
        // Manejo de errores o mensajes para indicar que se deben completar los campos
        alert("Por favor, completa todos los campos.");
      }
    }else{
      alert("Por favor llenar todos los campos")
    }

     // Almacena la información del usuario autenticado
  }

  register(){
    if(this.validarCamposRegister()){
    this.authService.crearPersona(this.per).subscribe(response =>{
      alert("Ingreso exitosamente")
      this.authService.setUsuarioAutenticado(response)
    }, error =>{
      alert("No se ha ingresado")
      
    });
  }else{
    alert("Por favor llenar todos los campos")
  }
  }

  validarCamposLogin() : boolean{
    return !!this.per.correo && !!this.per.contra
  }

  validarCamposRegister() : boolean {
    return !!this.per.cedula && !!this.per.nombre && !!this.per.apellido && !!this.per.telefono && !!this.per.direccion && !!this.per.correo && !!this.per.contra
  }
}
