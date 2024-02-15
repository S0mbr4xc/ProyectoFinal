import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ServicioClienteComponent } from './pages/servicio-cliente/servicio-cliente.component';
import { FooterComponent } from './footer/footer.component';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { MostrarFacComponent } from './pages/mostrar-fac/mostrar-fac.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/'; 

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    InicioComponent,
    ServicioClienteComponent,
    FooterComponent,
    TiendaComponent,
    LoginComponent,
    CarritoComponent,
    MostrarFacComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
