import { Component, OnInit } from '@angular/core';
import { Detalle } from 'src/app/domain/detalle';
import { AuthService } from 'src/app/services/auth-service';
import { FacturaServices } from 'src/app/services/factura-services';

@Component({
  selector: 'app-servicio-cliente',
  templateUrl: './servicio-cliente.component.html',
  styleUrls: ['./servicio-cliente.component.scss']
})
export class ServicioClienteComponent implements OnInit{

  detalles:any
  detallesFactura: any[] = [];
  

  constructor(private facturaServices : FacturaServices, private authService : AuthService){}

  ngOnInit(): void {
    this.detalles = this.facturaServices.getDetallesList(this.authService.getUsuarioAutenticado().codigo)
  }
}
