import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { enviroment } from "../enviroments/enviroment";
import { Persona } from "../domain/persona";

@Injectable({
    providedIn: 'root'
  })
export class CarritoServices {
    constructor(private http : HttpClient){}

    getCarritosporUsuario(persona:Persona){
        let url = enviroment.WS_PATH + "/carrito/cliente"
        return this.http.post<any>(url,persona)
    }

    getProductosCarrito(id:any){
        let url = `${enviroment.WS_PATH}/carrito/lista/productos/${id}`
        return this.http.get<any>(url)
    }

    addProductoAlCarrito(producto:any, codigo:number){
        let url = `${enviroment.WS_PATH}/carrito/lista/agregar-producto/${codigo}`
        return this.http.post<any>(url,producto)
    }
}
