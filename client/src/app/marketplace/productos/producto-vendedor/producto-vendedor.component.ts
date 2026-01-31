import { AfterViewInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-producto-vendedor',
  templateUrl: './producto-vendedor.component.html',
  styleUrls: ['./producto-vendedor.component.css']
})
export class ProductoVendedorComponent implements AfterViewInit{
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService) {

  }
  ngAfterViewInit(): void {
    this.listaVendedores();

  }

  listaVendedores() {
    //localhost:3000/productos/vendedores
    this.gService.list('productos/vendedores')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;               
      });
  }

  detalleProductoVendedor(id:number){
    this.router.navigate(['/productos/vendedor',id],
    {
      relativeTo:this.route
    })
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
