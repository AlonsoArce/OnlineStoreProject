import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-pedidos-detalle',
  templateUrl: './pedidos-detalle.component.html',
  styleUrls: ['./pedidos-detalle.component.css']
})
export class PedidosDetalleComponent {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private gService: GenericService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    let id = this.route.snapshot.paramMap.get('id');
    if (!isNaN(Number(id))) {
      this.obtenerPedido(Number(id));
    }
  }
  obtenerPedido(id: any) {
    this.gService
      .get('pedidos/detalle', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
        console.log(this.datos.id);
      });

  }

  regresar(){
    this.router.navigate(['/pedidos/vendedor/5'],
    {
      relativeTo:this.route
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
