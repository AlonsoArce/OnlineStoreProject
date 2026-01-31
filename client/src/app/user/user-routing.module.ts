import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioIndexComponent } from './usuario-index/usuario-index.component';
import { UsuarioRegistroComponent } from './usuario-registro/usuario-registro.component';
import { UsuarioAutenticacionComponent } from './usuario-autenticacion/usuario-autenticacion.component';
import { UsuarioHabilitadosComponent } from './usuario-habilitados/usuario-habilitados.component';
import { UsuarioDeshabilitadosComponent } from './usuario-deshabilitados/usuario-deshabilitados.component';
import { AuthGuard } from '../share/guards/auth.guard';
import { UsuarioDireccionesComponent } from './usuario-direcciones/usuario-direcciones.component';
import { UserDireccionesComponent } from './user-direcciones/user-direcciones/user-direcciones.component';
import { UserMetodoPagoComponent } from './user-metodoPago/user-metodo-pago/user-metodo-pago.component';
import { InformeAdministradorComponent} from './informe-administrador/informe-administrador/informe-administrador.component';


const routes: Routes = [
  {
    path: 'usuario',
    component: UsuarioIndexComponent,
    children: [
      { path: 'registrar', component: UsuarioRegistroComponent },
      { path: 'login', component: UsuarioAutenticacionComponent },
    ],
  },

  //{path:'usuarios/direcciones',component:UsuarioDireccionesComponent},
  //esta ruta es para acceder a la pagina de la lista de todos los usuarios registrados
  //{path:'usuarios', component: },
  //esta ruta es para acceder a la pagina de la lista de todos los usuarios habilitados
  {
    path: 'usuarios/habilitados', component: UsuarioHabilitadosComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['Administrador']
    }
  },
  //esta ruta es para acceder a la pagina de la lista de todos los usuarios deshabilitados
  {
    path: 'usuarios/deshabilitados', component: UsuarioDeshabilitadosComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['Administrador']
    }
  },

  {
    path: 'usuarios/informes', component: InformeAdministradorComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['Administrador']
    }
  },

  //ruta para acceder a las direcciones
  {
    path: 'usuarios/direcciones', component: UserDireccionesComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['Cliente', 'Vendedor']
    }
  },

  //ruta para acceder a los metodos de pago
  {
    path: 'usuarios/metodosPago', component: UserMetodoPagoComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['Cliente', 'Vendedor']
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
