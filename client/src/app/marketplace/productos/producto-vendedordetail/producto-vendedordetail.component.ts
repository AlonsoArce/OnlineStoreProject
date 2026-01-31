import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductoVendedordetailDataSource, ProductoVendedordetailItem } from './producto-vendedordetail-datasource';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-producto-vendedordetail',
  templateUrl: './producto-vendedordetail.component.html',
  styleUrls: ['./producto-vendedordetail.component.css']
})
export class ProductoVendedordetailComponent {
  datos:any;//guarda la respuesta del API
  destroy$: Subject<boolean>=new Subject<boolean>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<ProductoVendedordetailItem>;
  dataSource= new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['nombre', 'precio','cantidad', 'estado','preguntas','acciones']; 

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private gService:GenericService) {
    //obtener el parametro
    let id=this.route.snapshot.paramMap.get('id');
    if(!isNaN(Number(id))){
      this.obtenerProductosVendedorDetail(id);
    }
  }

 /*  ngAfterViewInit(): void {
    this.obtenerProductosVendedorDetail();
  } */

  obtenerProductosVendedorDetail(id:any){
    this.gService
    .get('productos/vendedores',id) // productos/vendedores/6
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      console.log(data);
        this.datos=data;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator; 
    });
   
  }

  crearProducto(){
    this.router.navigate(['/productos/create'],
    {
      relativeTo:this.route
    })
  }

  actualizarProducto(id: number){
    this.router.navigate(['/productos/update', id],
    {
      relativeTo:this.route
    })
  }

  verPreguntas(id:any){
    this.router.navigate(['/respuestas/vendedor',id],
    {
      relativeTo:this.route
    })
  }

 detalleProducto(id: number){
    this.router.navigate(['/productos',id],
    {
      relativeTo:this.route
    })
  }

  regresar(){
    this.router.navigate(['/productos/vendedores'],
    {
      relativeTo:this.route
    })
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
