import { Component, OnInit } from '@angular/core';
import { Carrito } from 'src/app/domain/carrito';
import { Detalle } from 'src/app/domain/detalle';
import { Persona } from 'src/app/domain/persona';
import { Producto } from 'src/app/domain/producto';
import { AuthService } from 'src/app/services/auth-service';
import { CarritoServices } from 'src/app/services/carrito-services';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit{
  car: Carrito = new Carrito();
  carritos: any;
  persona: Persona = new Persona();  // Agrega esto para manejar el objeto Persona
  emails: any;
  productos : any
  det : Detalle = new Detalle()
  prod : Producto = new Producto()
  detalles : any
  cantidad : any
  iva: number = 0;
  subtotal: number = 0;
  total: number = 0;
  cantidadesSeleccionadas: { [detalleId: string]: number } = {};

  constructor(private carritoServices: CarritoServices, private authService : AuthService) {}

  personaAutenticada = this.authService.getUsuarioAutenticado().correo
  codigoAutenticada = this.authService.getUsuarioAutenticado().codigo
  personaA = this.authService.getUsuarioAutenticado()


  ngOnInit(): void {
    this.carritoServices.getCarritosporUsuario(this.personaA).subscribe(
      response => {
        this.carritos = response;
        this.inicializarCantidadesSeleccionadas()
        console.log("Carritos obtenidos:", this.carritos);
      },
      error => {
        console.error("Error al obtener carritos:", error);
      }
    );
  }

  obtener() {
    this.persona.correo = this.emails;  // Asigna el correo a la propiedad correo de Persona
    this.carritoServices.getCarritosporUsuario(this.personaA).subscribe(response => {
      this.carritos = response;
      
      

      console.log("Carritos obtenidos:", this.carritos);
    }, error => {
      console.error("Error al obtener carritos:", error);
    });
  }

  // Actualiza las cantidades y totales
  actualizarTotales(detalle: any) {
    const cantidadSeleccionada = this.cantidadesSeleccionadas[detalle.id] || 0;
    const iva = detalle.producto.precio * 0.12;
    const subtotal = detalle.producto.precio + iva;
    const total = subtotal * cantidadSeleccionada;
  
    // Actualiza solo el detalle específico
    detalle.iva = iva;
    detalle.subtotal = subtotal;
    detalle.total = total;
  }

  // carrito.component.ts
inicializarCantidadesSeleccionadas() {
  this.cantidadesSeleccionadas = {};
  // Asegúrate de que carritos.detalle no es null o undefined antes de utilizar forEach
  console.log(this.carritos.detalle + "ATENTO AQUI VERGA")
  this.carritos.detalle?.forEach((detalle: any) => {
    this.cantidadesSeleccionadas[detalle.id] = 0;
  });
}

}
