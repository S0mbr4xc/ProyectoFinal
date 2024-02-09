import { Component, OnInit } from '@angular/core';
import { Cabecera } from 'src/app/domain/cabecera';
import { Carrito } from 'src/app/domain/carrito';
import { Detalle } from 'src/app/domain/detalle';
import { Persona } from 'src/app/domain/persona';
import { Producto } from 'src/app/domain/producto';
import { AuthService } from 'src/app/services/auth-service';
import { CarritoServices } from 'src/app/services/carrito-services';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { FacturaServices } from 'src/app/services/factura-services';


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
  codigoCabecera : any
  fechaFormateada = formatDate(this.fechaAngular, 'yyyy-MM-dd', 'en-US');
  detallesConValores: any[] = [];
  
  cantidadesSeleccionadas: { [detalleId: string]: number } = {};

  constructor(private carritoServices: CarritoServices, private authService : AuthService, private router : Router , private facturaService : FacturaServices) {}

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
    this.carritoServices.crearCabeceraYAsignarADetalles(this.authService.getUsuarioAutenticado().codigo, this.authService.getUsuarioAutenticado().codigo).subscribe(
        response => {
            console.log("Cabecera creada y asignada a detalles:", response);
            this.codigoCabecera = response.codigo;
            this.carritoServices.setCodigoCabecera(response.codigo);
            this.carritoServices.setearCabecera(this.codigoCabecera).subscribe(response => {
              // Resto del código
          });
            alert("PAGADO CON EXITO")
            this.router.navigate(['paginas/mostrar-fac'])
            /*this.carritoServices.eliminarCarrito(this.authService.getUsuarioAutenticado().codigo).subscribe(
              response => {
                  console.log("Carrito eliminado:", response);
                  console.log("exitooooooo");
              },
              error => {
                  console.error("Error al eliminar el carrito:", error);
              }
          );/*/

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

  SetearCab(){
    
  
  }

  actualizarDetallesEnBackend(IdProductoID: number, cantidad: number, detalleId:number) {
    this.facturaService.actualizarDetalles(IdProductoID, cantidad, detalleId).subscribe(
      response => {
        console.log("Detalles actualizados correctamente en el backend:", response);
        
      },
      error => {
        console.error("Error al actualizar los detalles en el backend:", error);
        // Maneja el error según sea necesario
      }
    );
  }

  // Actualiza las cantidades y totales
  actualizarTotales(detalle: any) {
    const cantidadSeleccionada = this.cantidadesSeleccionadas[detalle.id] || 0;
    const subtotal = detalle.producto.precio;
    const iva = detalle.producto.precio * 0.12;
    const total = subtotal * cantidadSeleccionada;
    const iva2 = iva*cantidadSeleccionada
  
    // Actualiza solo el detalle específico
    detalle.iva = iva2;
    detalle.subtotal = subtotal;
    detalle.total = total;
    console.log(cantidadSeleccionada)
    this.actualizarTotalesGlobales();
    this.actualizarDetallesEnBackend(detalle.producto.codigo, cantidadSeleccionada, detalle.codigo);

    this.iva = iva;
    this.subtotal = subtotal;
    this.total = total;

    console.log(this.iva)
    console.log(this.subtotal)
    console.log(this.total)

    const detalleConValor = {
      id: detalle.producto.codigo,
      iva: iva,
      subtotal: subtotal,
      total: total
    };
    this.detallesConValores.push(detalleConValor);
    console.log(this.detallesConValores)
  }

  
  // carrito.component.ts
  inicializarCantidadesSeleccionadas() {
    this.cantidadesSeleccionadas = {};
    // Asegúrate de que carritos.detalle no es null o undefined antes de utilizar forEach
    if (this.carritos.detalle) {
      this.carritos.detalle.forEach((detalle: any) => {
        this.cantidadesSeleccionadas[detalle.id] = 0;
      });
    }
  }

  actualizarTotalesGlobales() {
    if (this.carritos && this.carritos.detalle && this.carritos.detalle.length > 0) {
      this.subtotal = this.carritos.detalle.reduce((suma: number, detalle: any) => suma + detalle.subtotal * this.cantidad, 0);
      this.total = this.carritos.detalle.reduce((suma: number, detalle: any) => suma + detalle.total, 0);
  
      // Recalcular el IVATOTAL sumando los IVAs de todos los detalles multiplicados por la cantidad seleccionada
      this.iva = this.carritos.detalle.reduce((suma: number, detalle: any) => {
        // Suma el IVA del detalle multiplicado por la cantidad seleccionada
        suma += detalle.iva * (this.cantidadesSeleccionadas[detalle.id] || 0);
        return suma;
      }, 0);
    } else {
      // Si no hay detalles, establece los totales en 0
      this.subtotal = 0;
      this.total = 0;
      this.iva = 0;
    }
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

calcularTotalDetalles(): number {
  let totalDetalles = 0;
  if (this.carritos && this.carritos.detalle) {
    this.carritos.detalle.forEach((detalle: any) => {
      totalDetalles += detalle.total;
    });
  }
  return totalDetalles;
}

calcularSubtotalDetalles(): number {
  let subtotalDetalles = 0;
  if (this.carritos && this.carritos.detalle) {
    this.carritos.detalle.forEach((detalle: any) => {
      subtotalDetalles += detalle.subtotal;
    });
  }
  return subtotalDetalles;
}

// Función para calcular el total del IVA de los detalles
calcularIVADetalles(): number {
  let ivaDetalles = 0;
  if (this.carritos && this.carritos.detalle) {
    this.carritos.detalle.forEach((detalle: any) => {
      ivaDetalles += detalle.iva;
    });
  }
  return ivaDetalles;
}


}
