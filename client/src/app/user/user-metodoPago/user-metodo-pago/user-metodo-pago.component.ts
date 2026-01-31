import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-user-metodo-pago',
  templateUrl: './user-metodo-pago.component.html',
  styleUrls: ['./user-metodo-pago.component.css']
})
export class UserMetodoPagoComponent {
  destroy$: Subject<boolean> = new Subject<boolean>();
  titleForm: string = 'Registrar';
  currentUser:any
  //Nombre del formulario
  metodoPagoForm: FormGroup;
  makeSubmit: boolean = false;
  respuestaAPI: any;

  //arreglo de tipos de pago
  listTiposPago: string[] = 
  ['Crédito', 'Débito', 'Efectivo'];

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private authService: AuthenticationService) {
      this.formularioReactive();
      //Subscripciona la informacion del usuario actual 
     this.authService.currentUser.subscribe((x) => (this.currentUser = x))
     console.log("usuario: ", this.currentUser)
  }

  //Crear Formulario
  formularioReactive() {
    //[null, Validators.required]
    this.metodoPagoForm = this.fb.group({
      //Input type hidden
      //id: [null, null],
      tipo: [null, Validators.required],
      proveedor:[null,
        Validators.compose([
          Validators.required, Validators.minLength(2), Validators.maxLength(10)
        ])
      ],
      numeroCuenta:[null,
        Validators.compose([
          Validators.required, Validators.minLength(16), Validators.maxLength(18)
        ])
      ],
      fechaExpiracion: [null, Validators.required],
      clienteId: [null, null],
    });
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.metodoPagoForm.controls[control].hasError(error) &&
      this.metodoPagoForm.controls[control].invalid &&
      (this.makeSubmit || this.metodoPagoForm.controls[control].touched)
    );
  };

  guardarMetodoPago(){
    this.makeSubmit = true;
    if (this.metodoPagoForm.invalid) {
      console.log("FORM NO VALIDO");
      return;
    }
    this.metodoPagoForm.patchValue({clienteId: this.currentUser.user.id});
    this.gService.create('metodospago',this.metodoPagoForm.value)
    .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //Obtener respuesta
        this.respuestaAPI = data;
        console.log(data);
          this.router.navigate(['/productos'], {
        });
      });
  }
  
}
