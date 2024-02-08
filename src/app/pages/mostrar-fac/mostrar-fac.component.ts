import { Component, OnInit } from '@angular/core';
import { Cabecera } from 'src/app/domain/cabecera';
import { Detalle } from 'src/app/domain/detalle';
import { Persona } from 'src/app/domain/persona';
import { AuthService } from 'src/app/services/auth-service';
import { FacturaServices } from 'src/app/services/factura-services';

@Component({
  selector: 'app-mostrar-fac',
  templateUrl: './mostrar-fac.component.html',
  styleUrls: ['./mostrar-fac.component.scss']
})
export class MostrarFacComponent implements OnInit{

  detalles : any
  det : Detalle = new Detalle()
  constructor(private facturaServices: FacturaServices, private authService : AuthService) {}

  ngOnInit(): void {
    this.detalles = this.facturaServices.getDetallesList(this.authService.getUsuarioAutenticado().codigo)
  }

}
