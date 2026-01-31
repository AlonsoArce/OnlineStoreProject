import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { CartService } from 'src/app/share/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnChanges {
  isAuthenticated: boolean;
  @Input() currentUser: any;
  idUser: any
  qtyItems: Number = 0;
  isUser: boolean;
  isAdmin: boolean;
  isVendedor: boolean;

  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.isUser = false;
    this.isAdmin = false;
    this.isVendedor = false;
    this.qtyItems = this.cartService.quantityItems()
    //Subscripciona la informacion del usuario actual 
    this.authService.currentUser.subscribe((x) => (this.currentUser = x))
    console.log("usuario: ", this.currentUser)
    this.checkRoles()

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentUser']) {
       //Subscripciona la informacion del usuario actual 
    this.authService.currentUser.subscribe((x) => (this.currentUser = x))
    console.log("usuario: ", this.currentUser)
    this.checkRoles()
    }

   
  }

  ngAfterViewInit(): void {

    //Subcripcion al boolean que indica si  esta autenticado
    this.authService.isAuthenticated.subscribe((valor) => (this.isAuthenticated = valor));


    //Suscribirse al observable que gestiona la cantidad de items del carrito
    this.cartService.countItems.subscribe((value) => {
      this.qtyItems = value
    })
    this.checkRoles()

  }

  ngOnInit(): void {

    //Subcripcion al boolean que indica si  esta autenticado
    this.authService.isAuthenticated.subscribe((valor) => (this.isAuthenticated = valor));


    //Suscribirse al observable que gestiona la cantidad de items del carrito
    this.cartService.countItems.subscribe((value) => {
      this.qtyItems = value
    })
    this.checkRoles()

  }

  checkRoles() {
    console.log(this.currentUser)
    if (this.currentUser == null || this.currentUser == undefined) {
      this.idUser = 0
      console.log('no roles')
      this.isUser = false
      this.isAdmin = false
      this.isVendedor = false
    } else {
      this.idUser = this.currentUser.user.id
      this.currentUser.user.roles.forEach(element => {
        if (element.tipo == "Cliente") {
          this.isUser = true
          this.isAdmin = false
          console.log('isUser: ', this.isUser)
        } else if (element.tipo == "Administrador") {
          this.isAdmin = true
          this.isUser = false
          this.isVendedor = false
          console.log('isAdmin: ', this.isAdmin)
        } else if (element.tipo == "Vendedor") {
          this.isVendedor = true
          this.isAdmin = false
          console.log('isVendedor: ', this.isVendedor)

        }
      });
    }
  }

  login() {
    this.checkRoles()
    this.router.navigate(['usuario/login'])
  }

  logout() {
    this.authService.logout()
    this.checkRoles()
    this.router.navigate(['inicio'])
  }
}


