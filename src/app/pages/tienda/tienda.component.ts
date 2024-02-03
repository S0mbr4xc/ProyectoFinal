import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/domain/categoria';
import { Producto } from 'src/app/domain/producto';
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

  // Variable para almacenar el producto seleccionado
  productoSeleccionado: any;  // Ajust
  cat : Categoria = new Categoria()
  prod : Producto = new Producto()

  constructor(private categoriaService : TiendaServices){}

  ngOnInit():void{
    
    this.productos = this.categoriaService.getProductosAll()
  }

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
}
