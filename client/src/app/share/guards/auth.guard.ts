import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isAuthenticated: boolean;
  currentUser: any;
  constructor(
    private authService: AuthenticationService,
    private router: Router) {
    //Subscribirse para obtener si esta autenticado
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAuthenticated = valor)
    );
    //Subscribirse para obtener el usuario autenticado
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,

  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    return this.checkUserLogin(route, url);

  }
  //Verificar que el rol del usuario coincida
  //con alguno de los indicados
  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.isAuthenticated) {
      const userRole = this.currentUser.user.roles;
      //roles.length && roles.indexOf(verify.role)===-1
      console.log(userRole[0]['tipo'])
      console.log(route.data['roles'].includes(userRole))
      // for que recorra los roles para elegir cada uno 
      let shouldRedirect = false;

      userRole.forEach((element: any) => {
        console.log("tipo:", element.tipo);
        console.log("roles para la ruta: ", route.data['roles']);
        console.log("comparacion: ", route.data['roles'].includes(element.tipo));
        //console.log("largo: ", route.data['roles'].length)

        if (route.data['roles'].includes(element.tipo)) {
          shouldRedirect = true;
          console.log("cambia Shouldredirect: ", shouldRedirect)
          return;
        }
      });
      console.log("deberia redirigir: ", shouldRedirect)
      if (shouldRedirect) {
        console.log("da acceso");

        return true;
      } else {
        console.log("va a redirigir a inicio");

        this.router.navigate(['/'], {
          queryParams: { auth: 'no' }
        });
        return false;
      }

      // userRole.forEach((element: any) => {
      //   console.log("tipo:", element.tipo);
      //   console.log("route.data['roles']: ", route.data['roles'][0]);
      //   console.log("comparacion: ", route.data['roles'][0] == element.tipo);
      //   if (route.data['roles'].length && route.data['roles'][0] !== element.tipo) {
      //     this.router.navigate(['/'], {
      //       // Parametro para mostrar mensaje en login
      //       queryParams: { auth: 'no' }
      //     });
      //     console.log("entro");
      //     return false;
      //   }
      // });

      // Si llegamos a este punto, se asume que todas las comprobaciones fueron exitosas
      // if (route.data['roles'].length && !route.data['roles'].includes(userRole)) {
      //   this.router.navigate(['/'], {
      //     //Parametro para mostrar mensaje en login
      // queryParams: { auth: 'no' }});
      //   return false;
      // } 


    }

    this.router.navigate(['/usuario/login'], {
      queryParams: { auth: 'no' }
    });
    return false;
  }
}