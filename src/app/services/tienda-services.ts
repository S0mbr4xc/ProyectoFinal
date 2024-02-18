import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { enviroment } from "../enviroments/enviroment";

@Injectable({
    providedIn: 'root'
  })
export class TiendaServices {
    constructor(private http : HttpClient){}

    getCategorias(){
        let url = enviroment.WS_PATH + "/categorias/list"
        return this.http.get<any>(url)
    }

    getProductosAll(){
        let url = enviroment.WS_PATH + "/productos/list"
        return this.http.get<any>(url)
    }

    getProductosCat(cat: any){
        let url = `${enviroment.WS_PATH}/productos/list/${cat}`;
        return this.http.get<any>(url)
    }

    getProductosNombre(nombre: any){
        let url = `${enviroment.WS_PATH}/productos/list/${nombre}`;
        return this.http.get<any>(url)
    }
    
}
