import { AfterViewInit, Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-pedidos-cliente',
  templateUrl: './pedidos-cliente.component.html',
  styleUrls: ['./pedidos-cliente.component.css']
})
export class PedidosClienteComponent implements AfterViewInit {
  datos: any;// Variable que guardara la respuesta del API
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private gService: GenericService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {

    let id = this.route.snapshot.paramMap.get('id');
    if (!isNaN(Number(id))) {
      this.listaPedidos(Number(id));
    }
  }

  ngAfterViewInit(): void {
    //this.listaVideojuegos()
  }

  //Listar los productos llamando al API por id
  listaPedidos(id: any) {
    //localhost:3000/videojuego
    this.gService
      .get('pedidos', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
      });
  }

  detallePedido(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      id: id
    };
    //Crear componente
    //this.dialog.open(VideojuegoDiagComponent,dialogConfig);
  }
}
