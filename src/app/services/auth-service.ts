import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { enviroment } from "../enviroments/enviroment";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Persona } from "../domain/persona";

@Injectable({
    providedIn: 'root'
  })
export class AuthService {
    private usuarioAutenticado : any
    constructor(private http: HttpClient) {}

    login(correo: string, contra: string): Observable<any> {
        let url = enviroment.WS_PATH + "/personas/login";
        return this.http.post<any>(url, { correo, contra }).pipe(
          catchError(this.handleError)
        );
      }

   private handleError(error: any) {
    console.error("An error occurred", error);
    return throwError(error);
}

crearPersona(persona : Persona){
    let url = enviroment.WS_PATH + "/personas/crear"
    return this.http.post<any>(url,persona)
}

setUsuarioAutenticado(usuario: any) {
    this.usuarioAutenticado = usuario;
  }

  // Método para obtener el usuario autenticado
  getUsuarioAutenticado() {
    return this.usuarioAutenticado;
  }

  // Método para verificar si el usuario está autenticado
  estaAutenticado(): boolean {
    return !!this.usuarioAutenticado;
  }

  cerrarSesion(){
    return this.usuarioAutenticado =null
  }
}
