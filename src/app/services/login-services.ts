import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { enviroment } from "../enviroments/enviroment";

@Injectable({
    providedIn: 'root'
  })
export class LoginServices {
    constructor(private http: HttpClient){}

    getPersonas(){
        let url = enviroment.WS_PATH + "/personas/list"
        return this.http.get<any>(url)
    }
}
