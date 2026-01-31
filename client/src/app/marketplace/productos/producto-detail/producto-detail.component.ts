import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ComentariosFormComponent } from '../../comentarios/comentarios-form/comentarios-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { CartService } from 'src/app/share/cart.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notificacion.service';



@Component({
  selector: 'app-producto-detail',
  templateUrl: './producto-detail.component.html',
  styleUrls: ['./producto-detail.component.css']
})

export class ProductoDetailComponent implements OnInit {
  currentUser: any;
  datos: any;//guarda la respuesta del API
  destroy$: Subject<boolean> = new Subject<boolean>;

  mensaje: any;
  productoId: any;
  clienteId: any;
  respuesta: any;
  respPregunta: any
  isUser: boolean;

  pDatos: [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['preguntas'];


  constructor(
    private gService: GenericService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private router: Router,
    private cartService: CartService,
    private notificacion: NotificacionService,

    ) {

    //con esta linea se obtiene el parametro que viene en la ruta y se guarda en
    //variable let
    let id = this.route.snapshot.paramMap.get('id');
    this.productoId = id;
    if (!isNaN(Number(id))) {
      this.obtenerProductoById(id);
    }
    this.clienteId = '3';
    this.respuesta = '';
    this.mensaje = '';

    this.pDatos = [];


  }
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.obtenerProductoById(this.productoId);

    //Subscripciona la informacion del usuario actual 
    this.authService.currentUser.subscribe((x) => (this.currentUser = x))
    console.log("usuario: ", this.currentUser)
    this.checkRoles()
  }

  ngAfterViewInit(): void {


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


  obtenerProductoById(id: any) {
    this.gService
      .get('productos/detalle', id) //==> localhost:3000/productos/1
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
        this.dataSource = new MatTableDataSource(this.datos.preguntas);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(this.dataSource.data);

      });
  }

  comentario(): void {
    if (this.currentUser != null || this.currentUser != undefined  ) {
      //console.log(this.datos.id)
      const dialogRef = this.dialog.open(ComentariosFormComponent, {
        data: {
          mensaje: this.mensaje,
          productoId: this.productoId,
          clienteId: this.currentUser.user.id,
          respuesta: this.respuesta
        },
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result)

        if (result.mensaje != null) {
          this.pDatos = result;
          console.log(this.pDatos)
          this.hacerPregunta(this.pDatos)
        }

      });
    }else{
      this.notificacion.mensaje(
        'Pregunta',
        'Inicia sesion para hacer preguntas',
        TipoMessage.warning
      )
    }
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

  hacerPregunta(pDatos: any) {
    if (pDatos.mensaje != null) {
      this.gService.create('preguntas', pDatos)
        .pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
          this.respPregunta = data;
          //this.dialogRef.close();
          const id = Number(pDatos.productoId)

          this.obtenerProductoById(this.productoId);

          // console.log("deberia de viajar")
        })


    }


  }
}
