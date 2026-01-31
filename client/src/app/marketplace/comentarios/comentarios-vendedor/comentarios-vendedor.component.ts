import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-comentarios-vendedor',
  templateUrl: './comentarios-vendedor.component.html',
  styleUrls: ['./comentarios-vendedor.component.css']
})
export class ComentariosVendedorComponent {
  datos: any;// Variable que guardara la respuesta del API
  productoId: any // Variable que guardara el id del producto
  currentUser: any // Variable que guardara el id del vendedor
  preguntaId: any // Variable que guardara la id de la pregunta 
  actualizar: boolean; // Variable que determina si un campo esta para actualizar
  producto: any; //Variable que guarsa el nombre del producto
  respuesta = new FormControl('');
  pDatos: any;

  destroy$: Subject<boolean> = new Subject<boolean>();
  //Paginador y ordenador de material para tablas 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  //@ViewChild(MatTable) table!: MatTable<ProductoVendedordetailItem>;

  //Donde se guardaran los datos para la tabla 
  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['pregunta', 'respuesta','form', 'accion'];




  constructor(
    private gService: GenericService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService

  ) {
    this.actualizar = false
  
    //Obtener el id por parametros
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    this.productoId = id;
    if (!isNaN(Number(id))) {
      this.listaPreguntas(Number(id));
    }
    //Subscripciona la informacion del usuario actual 
    this.authService.currentUser.subscribe((x) => (this.currentUser = x))
    console.log("usuario: ", this.currentUser)
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.listaPreguntas(Number(this.productoId));
  }

  //Lista las preguntas llamando al API por id del producto
  listaPreguntas(id: any) {
    this.gService
      .get('preguntas/vendedor', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
        this.producto = this.datos.nombre
        //console.log(this.datos[0].preguntas);
        this.dataSource = new MatTableDataSource(this.datos.preguntas);
        console.log(this.dataSource.data)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  responder(datos: any) {
    console.log(datos)
    console.log("Respuesta: ", this.respuesta.value)

    datos["respuesta"] = this.respuesta.value;
    this.gService.update('preguntas/', datos)
      .pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        this.pDatos = data;
        this.respuesta.setValue('')
        this.actualizar = false;
        this.preguntaId = '';
        this.listaPreguntas(Number(this.productoId));

        //console.log("deberia de viajar")
      })

  }
  //Revisar cuando hay ya campos sin respuestas
  editar(datos: any) {
    this.actualizar = true;
    this.preguntaId = datos.id
    console.log(this.respuesta)
    //this.respuesta.setValue(datos.respuesta);
  }

  cerrar(datos: any){
    this.actualizar = false;
    this.preguntaId = ''
    this.respuesta.setValue('');
    this.dataSource.data['repsuesta']=datos.respuesta
  }


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

