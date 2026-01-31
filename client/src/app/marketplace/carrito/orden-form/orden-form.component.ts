import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { CartService } from 'src/app/share/cart.service';
//import { CartService, ItemCart } from 'src/app/share/cart.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notificacion.service';
//import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';

@Component({
  selector: 'app-orden-form',
  templateUrl: './orden-form.component.html',
  styleUrls: ['./orden-form.component.css'],
})
export class OrdenFormComponent implements OnInit {
  subtotal = 0;
  iva = 0;
  total = 0;
  fecha = Date.now();
  qtyItems = 0;
  isLinear = false;
  isFormalizing = false;
  isEditable = false;
  direcciones: any
  currentUser:any
  makeSubmit: boolean = false;
  metodos: any
  destroy$: Subject<boolean> = new Subject<boolean>();

  //Tabla
  displayedColumns: string[] = ['producto', 'precio', 'cantidad', 'subtotal', 'acciones'];
  columns: string[] = ['producto', 'precio', 'cantidad', 'subtotal'];

  dataSource = new MatTableDataSource<any>();


  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  @ViewChild('stepper') stepper!: MatStepper;
  formalizarCarritoClicked = true;
  formalizarOrdenClicked = false;
  formalizarPedidoClicked = false;


  constructor(
    private cartService: CartService,
    private noti: NotificacionService,
    private gService: GenericService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private authService: AuthenticationService,

  ) {

    this.reactiveForms()
    this.authService.currentUser.subscribe((x) => (this.currentUser = x))
    console.log("usuario: ", this.currentUser)
    //this.checkRoles()
    this.getDirecciones()
  }

  // elementCantidadControl(element: any) {
  //   // Devuelve el control para la cantidad del elemento específico
  //   return this.firstFormGroup.get('cantidades').get(`cantidad_${element.id}`);
  // }

  reactiveForms() {
    this.firstFormGroup = this._formBuilder.group({
      direcciones: ['', Validators.required],
      mPagos: ['', Validators.required],

    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });

  }

  ngOnInit(): void {
    this.cartService.currentDataCart$.subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.subtotal = this.cartService.getTotal()
    this.iva = this.subtotal * 0.13
    this.total = this.subtotal + this.iva
    this.isEditable = false;
    //this.cartService.getMax()
  }

  onReset() {
    this.firstFormGroup.reset();
  }

  actualizarCantidad(item: any) {
    if (item.cantidad >= item.max) {
      this.maxNoti(item)
    }
    this.cartService.addToCart(item);
    this.subtotal = this.cartService.getTotal();
    this.iva = this.subtotal * 0.13
    this.total = this.subtotal + this.iva
    this.isEditable = false;
    this.noti.mensaje('Orden',
      'Cantidad actualizada: ' + item.cantidad,
      TipoMessage.info)
  }

  eliminarItem(item: any) {
    this.cartService.removeFromCart(item);
    this.subtotal = this.cartService.getTotal();
    this.iva = this.subtotal * 0.13
    this.total = this.subtotal + this.iva
    this.isEditable = false;
    this.noti.mensaje('Orden',
      'Producto eliminado',
      TipoMessage.warning)
  }


  getDirecciones() {
    this.gService
      .get('direcciones',this.currentUser.user.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.direcciones = data;
        console.log("Direcciones: ",this.direcciones);
      });
  }

  registrarOrden() {
    this.formalizarOrdenClicked = true;
    this.formalizarCarritoClicked = false;
    this.stepper.next();
  }

  modificarCarrito() {
    this.formalizarCarritoClicked = true;
    this.formalizarOrdenClicked = false;

    this.stepper.previous();
  }

  registrarPedido() {
    // if (this.cartService.getItems != null) {
    //   //Obtener los items del carrito de compras
    //   let itemsCarrito = this.cartService.getItems;
    //   //Armar la estructura de la tabla intermedia
    //   //[{'videojuegoId':valor, 'cantidad':valor}]
    //   let detalles = itemsCarrito.map(
    //     x => ({
    //       ['productoId']: x.idItem,
    //       ['cantidad']: x.cantidad
    //     })
    //   )
    //   //Datos para el API
    //   let infoOrden = {
    //     'fechaOrden': new Date(this.fecha),
    //     'productos': detalles
    //   }
    //   this.gService.create('orden', infoOrden)
    //     .subscribe((respuesta: any) => {
    //       this.noti.mensaje('Orden',
    //         'Orden registrada #' + respuesta.id,
    //         TipoMessage.success)
    //       this.cartService.deleteCart();
    //       this.total = this.cartService.getTotal();
    //       console.log(respuesta)
    //       this.formalizarPedidoClicked = true;
    //       this.stepper.next();
    //     })
    // } else {
    //   this.noti.mensaje('Orden',
    //     'Agregue productos a la orden',
    //     TipoMessage.warning)
    // }
    this.formalizarPedidoClicked = true;
    // this.stepper.next();
  }

  maxNoti(item: any) {
    this.noti.mensaje('Orden',
      '¡No puedes agregar mas ' + '"' + item.product.nombre + '"' + ' a la Orden! Solo existen ' + item.max + ' en el inventario',
      TipoMessage.warning)
  }
}

