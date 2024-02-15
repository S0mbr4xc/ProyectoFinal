import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/domain/categoria';
import { Producto } from 'src/app/domain/producto';
import { AuthService } from 'src/app/services/auth-service';
import { CarritoServices } from 'src/app/services/carrito-services';
import { TiendaServices } from 'src/app/services/tienda-services';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent implements OnInit {
  categorias : any
  productos : any
  mostrarListaProductos: boolean = true;
  mostrarInfoAdicional: boolean = false;
  // Dentro de tu componente
productosSeleccionados: Producto[] = [];


  // Variable para almacenar el producto seleccionado
  productoSeleccionado: any;  // Ajust
  cat : Categoria = new Categoria()
  prod : Producto = new Producto()

  constructor(private categoriaService : TiendaServices, private carritoServices : CarritoServices, private authService : AuthService){}

  ngOnInit():void{
    this.productos = this.categoriaService.getProductosAll()
  }

  personaAutenticada = this.authService.getUsuarioAutenticado().correo
  codigoAutenticada = this.authService.getUsuarioAutenticado().codigo


  mostrarInformacionAdicional(producto: any) {
    this.productoSeleccionado = producto;
    this.mostrarInfoAdicional = true;
    this.mostrarListaProductos = false;
  }

  // Método para ocultar la información adicional y mostrar la lista de productos
  ocultarInformacionAdicional() {
    this.mostrarInfoAdicional = false;
    this.productoSeleccionado = null;
    this.mostrarListaProductos = true;
  }

  agregarAlCarrito(producto: Producto) {
    this.productosSeleccionados.push(producto);
    // Puedes imprimir el array para verificar en la consola
    console.log(this.productosSeleccionados);
    this.carritoServices.agregarProductoACarrito(this.productoSeleccionado, this.codigoAutenticada)
    .subscribe(
      response => {
        console.log(response);  // Maneja la respuesta del backend según tus necesidades
      },
      error => {
        console.error(error);  // Maneja el error según tus necesidades
      }
    );

  }
  
}
