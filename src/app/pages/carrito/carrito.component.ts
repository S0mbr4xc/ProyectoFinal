import { Component, OnInit } from '@angular/core';
import { Cabecera } from 'src/app/domain/cabecera';
import { Carrito } from 'src/app/domain/carrito';
import { Detalle } from 'src/app/domain/detalle';
import { Persona } from 'src/app/domain/persona';
import { Producto } from 'src/app/domain/producto';
import { AuthService } from 'src/app/services/auth-service';
import { CarritoServices } from 'src/app/services/carrito-services';
import { formatDate } from '@angular/common';


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
  fechaa :any
  fechaAngular = new Date();
  fechaFormateada = formatDate(this.fechaAngular, 'yyyy-MM-dd', 'en-US');
  
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
        this.fechaa = new Date()
        console.log(this.fechaa)
      },
      error => {
        console.error("Error al obtener carritos:", error);
      }
    );
  }

  crearCabeceraYAsignarADetalles() {
    // Crea un objeto Cabecera con los datos necesarios
    const cabecera: Cabecera = {
        fecha: new Date(), // Puedes ajustar la fecha según tus necesidades
        subtotal: this.subtotal,
        iva: this.iva,
        total: this.total,
        persona: this.personaA,
        detalle: []
         // Puedes dejarlo vacío si aún no tienes detalles
    };
    console.log(cabecera)

    // Llama al servicio para crear la cabecera y asignarla a detalles
    this.carritoServices.crearCabeceraYAsignarADetalles(this.authService.getUsuarioAutenticado().codigo, cabecera).subscribe(
        response => {
            console.log("Cabecera creada y asignada a detalles:", response);
            alert("PAGADO CON EXITO")

            // Puedes realizar otras acciones después de la creación y asignación
        },
        error => {
            console.error("Error al crear la cabecera y asignar a detalles:", error);
            alert("No se pudo pagar, chiro.")
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

sumaTotales(): number {
  return (this.carritos.detalle as Detalle[])?.reduce((suma, detalle) => {
    if (detalle.total !== undefined) {
      suma += detalle.total;
    }
    return suma;
  }, 0) || 0;
}

sumaIvas(): number {
  return (this.carritos.detalle as Detalle[])?.reduce((suma, detalle) => {
    if (detalle.iva !== undefined) {
      suma += detalle.iva;
    }
    return suma;
  }, 0) || 0;
}

sumaSubtotales(): number {
  return (this.carritos.detalle as Detalle[])?.reduce((suma, detalle) => {
    if (detalle.subtotal !== undefined) {
      suma += detalle.subtotal;
    }
    return suma;
  }, 0) || 0;
}


}
