import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { ProductosComponent } from './productos/productos.component';
import { PedidosClienteComponent } from './pedidos/pedidos-cliente/pedidos-cliente.component';
import { PedidosDetalleComponent } from './pedidos/pedidos-detalle/pedidos-detalle.component';
import { ProductoDetailComponent } from './productos/producto-detail/producto-detail.component';
import { ProductoAllComponent } from './productos/producto-all/producto-all.component';
import { ProductoVendedordetailComponent } from './productos/producto-vendedordetail/producto-vendedordetail.component';
import { ProductoVendedorComponent } from './productos/producto-vendedor/producto-vendedor.component';
import { PedidosVendedorComponent } from './pedidos/pedidos-vendedor/pedidos-vendedor.component';
import { OrdenFormComponent } from './carrito/orden-form/orden-form.component';
import { ComentariosFormComponent } from './comentarios/comentarios-form/comentarios-form.component';
import { ComentariosDetailComponent } from './comentarios/comentarios-detail/comentarios-detail.component';
import { ComentariosVendedorComponent } from './comentarios/comentarios-vendedor/comentarios-vendedor.component';
import { ProductoFormComponent } from './productos/producto-form/producto-form.component';
import { AuthGuard } from '../share/guards/auth.guard';


const routes: Routes = [

  //esta ruta es para acceder a la pagina de la lista de productos
  //{ path: 'productos', component: ProductoAllComponent },
  {
    path: 'productos',
    component: ProductoAllComponent,

  },
  //esta ruta es para acceder a la pagina de ProductoDetail
  {
    path: 'productos/:id', component: ProductoDetailComponent,
  },

  //esta ruta es para acceder a la pagina de ProductoVendedor
  {
    path: 'productos/vendedores', component: ProductoVendedorComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['Administrador']
    }
  },

  //esta ruta es para acceder a la pagina de Producto Create
  {
    path: 'productos/create', component: ProductoFormComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['Vendedor']
    }
  },



  //esta ruta es para acceder a la pagina de Producto Update
  {
    path: 'productos/update/:id', component: ProductoFormComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['Vendedor']
    }
  },

  //esta ruta es para acceder a la pagina de ProductoVendedorDetail
  {
    path: 'productos/vendedor/:id', component: ProductoVendedordetailComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['Vendedor']
    }
  },

  {
    path: 'orden', component: OrdenFormComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['Cliente']
    },
  },

  {
    path: 'comentarios', component: ComentariosFormComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['Cliente', 'Vendedor']
    }
  },
  {
    path: 'respuestas/vendedor/:id', component: ComentariosVendedorComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['Vendedor']
    }
  },
  {
    path: 'comentarios/:id', component: ComentariosDetailComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['Vendedor']
    }
  },

  {
    path: 'pedidos/:id', component: PedidosClienteComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['Cliente', 'Vendedor']
    }
  },
  {
    path: 'pedidos/detalle/:id', component: PedidosDetalleComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['Cliente', 'Vendedor']
    }
  },
  {
    path: 'pedidos/vendedor/:id', component: PedidosVendedorComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['Vendedor']
    }
  },




  //{path:'producto/all', component: },

  //{path:'producto/create', component: },

  //{path:'producto/:id', component: },

  //{path:'producto/update/:id', component: },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketplaceRoutingModule { }
