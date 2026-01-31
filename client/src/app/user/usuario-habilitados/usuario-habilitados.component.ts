import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserHabilitadosDataSource, UsuarioHabilitadosItem } from './usuario-habilitados-datasource';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notificacion.service';

@Component({
  selector: 'app-usuario-habilitados',
  templateUrl: './usuario-habilitados.component.html',
  styleUrls: ['./usuario-habilitados.component.css']
})
export class UsuarioHabilitadosComponent implements AfterViewInit {
  datos:any;//guarda la respuesta del API
  destroy$: Subject<boolean>=new Subject<boolean>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<UserHabilitadosItem>;
  dataSource= new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['nombreCompleto','identificacion','numeroTelefono',
                      'correoElectronico','estado', 'acciones']; ;

  constructor(private router:Router,
    private route:ActivatedRoute,
    private gService:GenericService,
    private noti: NotificacionService,) {
  }

  ngAfterViewInit(): void {
    this.listaUsuariosHabilitados();
  }

  listaUsuariosHabilitados(){
    this.gService.list('usuarios/habilitados').    
      pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        console.log(data);
          this.datos=data;
          this.dataSource = new MatTableDataSource(this.datos);
          console.log(this.dataSource)
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator; 
      });
  }

  //este metodo actualice el estado del usuario a deshabilitado
  actualizarEstado(id:number){
    console.log(id);
    let usuario = {
      'id': id
    }
    this.gService.update('usuarios/habilitados', usuario) //http://localhost:3000/usuarios/habilitados/3
    .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        console.log(data);
        this.noti.mensaje('Usuarios', 'Usuario deshabilitado', TipoMessage.success);
        this.listaUsuariosHabilitados()
      });
  }


  regresar(){
    this.router.navigate(['/usuarios/'],
    {
      relativeTo:this.route
    })
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
