import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketplaceRoutingModule } from './marketplace-routing.module';
//import { ProductosComponent } from './productos/productos.component';
import { PedidosClienteComponent } from './pedidos/pedidos-cliente/pedidos-cliente.component';
import { PedidosVendedorComponent } from './pedidos/pedidos-vendedor/pedidos-vendedor.component';
import { PedidosDetalleComponent } from './pedidos/pedidos-detalle/pedidos-detalle.component';
import { ProductoDetailComponent } from './productos/producto-detail/producto-detail.component';
import { ProductoAllComponent } from './productos/producto-all/producto-all.component';
import { ProductoVendedordetailComponent } from './productos/producto-vendedordetail/producto-vendedordetail.component';
import { ProductoVendedorComponent } from './productos/producto-vendedor/producto-vendedor.component';
import { ProductoFormComponent } from './productos/producto-form/producto-form.component';


import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button'; 
import {MatDividerModule} from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';  
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import { OrdenFormComponent } from './carrito/orden-form/orden-form.component';
import { PedidosVendedorDetalleComponent } from './pedidos/pedidos-vendedor-detalle/pedidos-vendedor-detalle.component';
import { PedidoFormComponent } from './pedidos/pedido-form/pedido-form.component';
import { ComentariosFormComponent } from './comentarios/comentarios-form/comentarios-form.component';
import { ComentariosDetailComponent } from './comentarios/comentarios-detail/comentarios-detail.component';
import { ComentariosVendedorComponent } from './comentarios/comentarios-vendedor/comentarios-vendedor.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {CdkStepperModule} from '@angular/cdk/stepper';
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { HttpErrorInterceptorService } from '../share/http-error-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    //ProductosComponent,
    PedidosClienteComponent,
    PedidosDetalleComponent,
    ProductoAllComponent,
    ProductoDetailComponent,
    ProductoVendedordetailComponent,
    ProductoVendedorComponent,
    PedidosVendedorComponent,
    PedidosVendedorDetalleComponent,
    PedidoFormComponent,
    OrdenFormComponent,
    ProductoFormComponent,
    ComentariosFormComponent,
    ComentariosDetailComponent,
    ComentariosVendedorComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatListModule,
    MatMenuModule,
    MatCardModule, 
    MatIconModule, 
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    MatTableModule,
    MatRadioModule,
    MatSelectModule,
    MatPaginatorModule,
    MatStepperModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSortModule,
    MatCheckboxModule,
    CdkStepperModule,
    PickerModule,
    
    MarketplaceRoutingModule
  ],



})
export class MarketplaceModule { }
