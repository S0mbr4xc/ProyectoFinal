import { Component, OnInit } from '@angular/core';
import { Carrito } from 'src/app/domain/carrito';
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
  prod : Producto = new Producto()

  constructor(private carritoServices: CarritoServices, private authService : AuthService) {}

  personaAutenticada = this.authService.getUsuarioAutenticado().correo
  codigoAutenticada = this.authService.getUsuarioAutenticado().codigo


  ngOnInit(): void {
    this.carritoServices.getProductosCarrito(this.codigoAutenticada).subscribe(response => {
      this.productos = response;
      console.log("Productos obtenidos:", this.productos);
    }, error => {
      console.error("Error al obtener productos:", error);
    });
  }

  obtener() {
    this.persona.correo = this.emails;  // Asigna el correo a la propiedad correo de Persona
    this.carritoServices.getCarritosporUsuario(this.persona).subscribe(response => {
      this.carritos = response;
      console.log("Carritos obtenidos:", this.carritos);
    }, error => {
      console.error("Error al obtener carritos:", error);
    });
  }
}
