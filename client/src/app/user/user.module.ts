import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UsuarioRegistroComponent } from './usuario-registro/usuario-registro.component';
import { UsuarioAutenticacionComponent } from './usuario-autenticacion/usuario-autenticacion.component';
import { UsuarioIndexComponent } from './usuario-index/usuario-index.component';
import { UsuarioDeshabilitadosComponent } from './usuario-deshabilitados/usuario-deshabilitados.component';
import { UsuarioHabilitadosComponent } from './usuario-habilitados/usuario-habilitados.component';
import { UserDireccionesComponent } from './user-direcciones/user-direcciones/user-direcciones.component';
import { UserMetodoPagoComponent } from './user-metodoPago/user-metodo-pago/user-metodo-pago.component';  
import { UsuarioDireccionesComponent } from './usuario-direcciones/usuario-direcciones.component';
import {InformeAdministradorComponent } from './informe-administrador/informe-administrador/informe-administrador.component';


import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider'; 
import {MatDialogModule} from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    UsuarioRegistroComponent,
    UsuarioAutenticacionComponent,
    UsuarioIndexComponent,
    UsuarioHabilitadosComponent,
    UsuarioDeshabilitadosComponent,
    UsuarioDireccionesComponent,
    UserDireccionesComponent,
    UserMetodoPagoComponent,
    InformeAdministradorComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,MatIconModule,
    LayoutModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule, UserRoutingModule
  ]
})
export class UserModule { }
