import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-pedidos-vendedor',
  templateUrl: './pedidos-vendedor.component.html',
  styleUrls: ['./pedidos-vendedor.component.css']
})
export class PedidosVendedorComponent {
  datos: any;// Variable que guardara la respuesta del API
  destroy$: Subject<boolean> = new Subject<boolean>();

  //Paginador y ordenador de material para tablas 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  //@ViewChild(MatTable) table!: MatTable<ProductoVendedordetailItem>;
  
  //Donde se guardaran los datos para la tabla 
  dataSource = new MatTableDataSource<any>();

 /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
 displayedColumns = ['pedido','id','producto', 'estado','cantidad','cliente','acciones']; 




  constructor(
    private gService: GenericService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    //Obtener el id por parametros
    let id = this.route.snapshot.paramMap.get('id');
    if (!isNaN(Number(id))) {
      this.listaPedidos(Number(id));
    }
  }

  //ngAfterViewInit(): void {
    //this.listaVideojuegos()
  //}

  //Listar los productos llamando al API por id
  listaPedidos(id: any) {
    //localhost:3000/videojuego
    this.gService
      .get('pedidos/vendedor', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator; 
      
      });
  }

  detallePedido(id: number) {
    this.router.navigate(['/pedidos/detalle',id],
    {
      relativeTo:this.route
    })
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = false;
    // dialogConfig.data = {
    //   id: id
    // };
    // //Crear componente
    // this.dialog.open(PedidosDetalleComponent,dialogConfig);
  }

  regresar(){
    this.router.navigate(['/pedidos/5'],
    {
      relativeTo:this.route
    })
  }

  guardar(datos:any){}

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
