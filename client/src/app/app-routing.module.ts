import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Imports para las rutas
import { InicioComponent } from './home/inicio/inicio.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

const routes: Routes = [
  //Rutas que conectaran en la pagina
  { path:'inicio',component:InicioComponent},
  { path: '', redirectTo:'inicio',pathMatch:'full'},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
