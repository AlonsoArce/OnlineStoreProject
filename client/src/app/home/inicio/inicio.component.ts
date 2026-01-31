import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notificacion.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements AfterViewInit {
  currentUser: any;
  isUser: boolean;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private notificacion: NotificacionService,
  ) {
    this.checkRoles()
  }

  ngAfterViewInit():void{
    this.checkRoles()
    
    this.ngOnInit()
  } 
  ngOnInit(): void {
    this.mensajes();
    //Subscripciona la informacion del usuario actual 
    this.authService.currentUser.subscribe((x) => (this.currentUser = x))
    console.log("usuario: ", this.currentUser)
    this.checkRoles()
  }

  mensajes() {
    let auth = ''
    let register = false;

    //Obtener parametros de la URL
    this.route.queryParams.subscribe((params) => {
      register = params['register'] === 'true' || false;
      auth = params['auth'] || '';

      if (register) {
        this.notificacion.mensaje(
          'Usuario',
          'Usuario registrado! Especifique sus credenciales', TipoMessage.success
        )
      }

      if (auth) {
        this.notificacion.mensaje(
          'Usuario',
          'Acceso denegado', TipoMessage.warning
        )
      }
    })
  }
  checkRoles() {
    console.log(this.currentUser)
    if (this.currentUser == null) {
      console.log('no roles')
      this.isUser = false
    } else {
      this.currentUser.user.roles.forEach(element => {
        if (element.tipo == "Cliente" || element.tipo=="Administrador") {
          this.isUser = true
          console.log('isUser: ', this.isUser)

        }
      });
    }
  }

  goTo(page: any) {
    console.log(page)
    if (page == "productos") {
      this.router.navigate(['/productos/'],
        {
          relativeTo: this.route
        })
    } else if (page == "productosV") {
      this.router.navigate(['/productos/vendedores'],
        {
          relativeTo: this.route
        })
    } else if (page == "pedidos") {
      this.router.navigate(['/pedidos/', this.currentUser.user.id],
        {

          relativeTo: this.route
        })
    } else if (page == "pedidosV") {
      this.router.navigate(['/pedidos/vendedor/', this.currentUser.user.id],
        {

          relativeTo: this.route
        })
    } else if (page == "pVendedor") {
      this.router.navigate(['/productos/vendedor/', this.currentUser.user.id],
        {

          relativeTo: this.route
        })
    } else if (page == "carrito") {
      this.router.navigate(['/orden'],
        {
          relativeTo: this.route
        })
    }
    else if (page == "pregunta") {
      this.router.navigate(['/comentarios'],
        {
          relativeTo: this.route
        })
    } else if (page == "respuesta") {
      this.router.navigate(['/comentarios'],
        {
          relativeTo: this.route
        })
    } else if (page == "comentarios") {
      this.router.navigate(['/comentarios/2'],
        {
          relativeTo: this.route
        })
    }
  }
}
