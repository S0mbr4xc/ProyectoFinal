import { Component, OnInit } from '@angular/core';
import { Categoria } from '../domain/categoria';
import { TiendaServices } from '../services/tienda-services';
import { Route, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  categorias: Categoria[] = [];
  cat : Categoria = new Categoria();
  isHoveringTienda: boolean = false;
  mostrarFormularioIngreso: boolean = false;
  mostrarFormularioRegistro: boolean = false;
  p :any
  mostrarInfoUsuario: boolean = false;

  
  constructor(private tiendaServices : TiendaServices, private router : Router, private authService : AuthService){}
  paginas = [
    {titulo: "Inicio", path: 'paginas/inicio'},
    {titulo: "Servicio al Cliente", path: 'paginas/servicio-cliente'},
    {titulo: "Tienda", path: "paginas/tienda"}
  ]


  ngOnInit(): void {
    this.tiendaServices.getCategorias().subscribe(
      (data: Categoria[]) => { // Asegúrate de que la respuesta es del tipo Categoria[]
        this.categorias = data;
      },
      (error) => {
        console.error('Error al obtener las categorías', error);
      }
    );
  }

  

  mostrarCategorias: boolean = false;

  // Método para mostrar la lista de categorías
  mostrarListaCategorias() {
    this.mostrarCategorias = true;
  }

  // Método para ocultar la lista de categorías
  ocultarListaCategorias() {
    this.mostrarCategorias = false;
  }

  mostrarIngreso() {
    this.mostrarFormularioIngreso = true;
    this.mostrarFormularioRegistro = false;
    // Aquí puedes agregar lógica adicional si es necesario
}

mostrarRegistro() {
    this.mostrarFormularioIngreso = false;
    this.mostrarFormularioRegistro = true;
    // Aquí puedes agregar lógica adicional si es necesario
}


  irLogin(){
    this.router.navigate(['paginas/login'])
  }

  obtenerUsuarioAutenticado() {
    return this.authService.getUsuarioAutenticado();
  }
  
  // Método para verificar si el usuario está autenticado
  estaAutenticado() {
    return this.authService.estaAutenticado();
  }


  cerrarSesion(){
    return this.authService.cerrarSesion()
  }

  toggleInfoUsuario() {
    this.mostrarInfoUsuario = !this.mostrarInfoUsuario;
  }

  irCarrito(){
    this.router.navigate(["paginas/carrito"])
  }

}
