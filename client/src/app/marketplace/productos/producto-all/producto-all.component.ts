import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from 'src/app/share/cart.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notificacion.service';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-producto-all',
  templateUrl: './producto-all.component.html',
  styleUrls: ['./producto-all.component.css']
})
export class ProductoAllComponent implements OnInit {
  datos: any;
  currentUser: any;
  isUser: boolean;
  destroy$: Subject<boolean> = new Subject<boolean>();
  cardImageBase64: any;
  images: string[] = [];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private cartService: CartService,
    private authService: AuthenticationService,
    private notificacion: NotificacionService,
    private gService: GenericService) {

  }
  ngOnInit(): void {

    this.listaProductos();
    //Subscripciona la informacion del usuario actual 
    this.authService.currentUser.subscribe((x) => (this.currentUser = x))
    console.log("usuario: ", this.currentUser)
    this.checkRoles()
  }

  listaProductos() {
    //localhost:3000/productos
    this.gService.list('productos/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
      });
  }

  checkRoles() {
    console.log(this.currentUser)
    if (this.currentUser == null) {
      console.log('no roles')
      this.isUser = false
    } else {
      this.currentUser.user.roles.forEach(element => {
        if (element.tipo == "Cliente") {
          console.log('isUser: ', this.isUser)
          this.isUser = true
        }
      });

    }



  }

  detalleProducto(id: number) {
    this.router.navigate(['/productos', id],
      {
        relativeTo: this.route
      })
  }


  comprar(id: number) {
    this.gService
      .get('productos/detalle', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //Agregar videojuego obtenido del API al carrito
        this.cartService.addToCart(data);
        //Notificar al usuario
        this.notificacion.mensaje(
          'Orden',
          'Producto: ' + data.nombre + ' agregado a la orden',
          TipoMessage.success
        )
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


}
