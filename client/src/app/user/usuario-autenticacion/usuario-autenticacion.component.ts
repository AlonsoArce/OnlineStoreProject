import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notificacion.service';

@Component({
  selector: 'app-usuario-autenticacion',
  templateUrl: './usuario-autenticacion.component.html',
  styleUrls: ['./usuario-autenticacion.component.css']
})
export class UsuarioAutenticacionComponent implements OnInit {
  hide = true;
  formulario: FormGroup;
  makeSubmit: boolean = false;
  infoUsuario: any;
  constructor(
    public fb: FormBuilder,
    private authService: AuthenticationService,
    private notificacion: NotificacionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.reactiveForm();
  }
  // Definir el formulario con su reglas de validación
  reactiveForm() {
    this.formulario = this.fb.group({
      correoElectronico: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.mensajes();
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
  onReset() {
    this.formulario.reset();
  }
  submitForm() {
    this.makeSubmit = true;
    //Validación
    if (this.formulario.invalid) {
      return;
    }
    this.authService.loginUser(this.formulario.value)
      .subscribe((respuesta: any) => {
        console.log(respuesta.data)
        this.router.navigate(['/']);
      })
  }
  /* Manejar errores de formulario en Angular */

  public errorHandling = (control: string, error: string) => {
    return (
      this.formulario.controls[control].hasError(error) &&
      this.formulario.controls[control].invalid &&
      (this.makeSubmit || this.formulario.controls[control].touched)
    );
  };
}
