import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { enviroment } from "../enviroments/enviroment";
import { Persona } from "../domain/persona";
import { Producto } from "../domain/producto";
import { Cabecera } from "../domain/cabecera";

@Injectable({
    providedIn: 'root'
  })
export class CarritoServices {
    static codigoCabecera: number | undefined;
    constructor(private http : HttpClient){}

    getCarritosporUsuario(persona:Persona){
        let url = enviroment.WS_PATH + "/carrito/cliente"
        return this.http.post<any>(url,persona)
    }

    getProductosCarrito(id:any){
        let url = `${enviroment.WS_PATH}/carrito/lista/productos/${id}`
        return this.http.get<any>(url)
    }

    agregarProductoACarrito(producto: Producto, codigo: number) {
        let url = `${enviroment.WS_PATH}/carrito/agregar-producto/${codigo}`;
        return this.http.post<any>(url, producto);
      }

      crearCabeceraYAsignarADetalles(codigo: number, personaID : any) {
        const url = `${enviroment.WS_PATH}/carrito/cabeceraAdd/${codigo}/${personaID}`;
        return this.http.post<any>(url, codigo);
    }

    eliminarCarrito(codigo:any){
        let url = `${enviroment.WS_PATH}/carrito/eliminar-carrito/${codigo}`;
        return this.http.post<any>(url,codigo)
    }

    setearCabecera(codigoCab : any){
        let url = `${enviroment.WS_PATH}/carrito/sumar-detalles-cabecera/${codigoCab}`;
        return this.http.get<any>(url)
    }

    setCodigoCabecera(codigo: number) {
        CarritoServices.codigoCabecera = codigo;
      }

   
}
