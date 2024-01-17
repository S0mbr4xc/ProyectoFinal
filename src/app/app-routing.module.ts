import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ServicioClienteComponent } from './pages/servicio-cliente/servicio-cliente.component';

const routes: Routes = [
  {path : "paginas/inicio", component: InicioComponent},
  {path: "paginas/servicio-cliente", component: ServicioClienteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
