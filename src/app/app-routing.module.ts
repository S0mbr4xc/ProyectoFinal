import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ServicioClienteComponent } from './pages/servicio-cliente/servicio-cliente.component';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { LoginComponent } from './pages/login/login.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { MostrarFacComponent } from './pages/mostrar-fac/mostrar-fac.component';

const routes: Routes = [
  {path: "", redirectTo: "paginas/inicio", pathMatch: "full"},
  {path: "paginas/inicio", component: InicioComponent},
  {path: "paginas/servicio-cliente", component: ServicioClienteComponent},
  {path: "paginas/tienda", component: TiendaComponent},
  {path: "paginas/login", component: LoginComponent},
  {path: "paginas/carrito", component: CarritoComponent},
  {path: "paginas/mostrar-fac", component: MostrarFacComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
