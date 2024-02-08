import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { enviroment } from "../enviroments/enviroment";

@Injectable({
    providedIn: 'root'
  })
export class FacturaServices {
    constructor(private http : HttpClient){}

    getCabecera(){
        let url = enviroment.WS_PATH + "/cabecera/list"
        return this.http.get<any>(url)
    }

    getDetalle(){
        let url = enviroment.WS_PATH + "/detalle/list"
        return this.http.get<any>(url)
    }

    actualizarDetalles(IdProductoID: any, cantidad: any, detalleId : any) {
        let url = `${enviroment.WS_PATH}/detalle/actualizar/${IdProductoID}/${cantidad}/${detalleId}`;
        return this.http.post<any>(url, IdProductoID);
    }

    getDetallesList(cabeceraID : any){
        let url = `${enviroment.WS_PATH}/detalle/cabecera/${cabeceraID}`;
        return this.http.get<any>(url)
    }
}
