//Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Modulos y componentes.
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { MarketplaceModule } from './marketplace/marketplace.module';

//librerias
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpErrorInterceptorService } from './share/http-error-interceptor.service';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    //Librerías
    BrowserModule,// importar HttpClientModule después BrowserModule.
    // comunicarse con un servidor a través del protocolo HTTP 
    HttpClientModule,
     // Debe agregar el import respectivo // importar otras
//dependencias que sean necesario cargar en el componente principal.

    BrowserAnimationsModule,
    //Libreria de notificaciones flotantes
    ToastrModule.forRoot(),
    MatSidenavModule,
    
    
    //módulos creados propios en orden 
    CoreModule,
    ShareModule,
    HomeModule,
    UserModule,
    MarketplaceModule,
        //Siempre de último
    AppRoutingModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
