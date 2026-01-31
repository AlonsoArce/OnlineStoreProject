import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-usuario-registro',
  templateUrl: './usuario-registro.component.html',
  styleUrls: ['./usuario-registro.component.css']
})
export class UsuarioRegistroComponent implements OnInit {
  hide = true;
  usuario: any;
  roles: any;
  formCreate: FormGroup;
  makeSubmit: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private authService: AuthenticationService
  ) {
    this.reactiveForm();
  }

  reactiveForm() {
    this.formCreate = this.fb.group({
      nombreCompleto: ['', [Validators.required]],
      correoElectronico: ['', [Validators.required]],
      identificacion:[null,
        Validators.compose([
          Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]*$')
        ])],
      contrasena: ['', [Validators.required]],
      numeroTelefono :[null,
        Validators.compose([
          Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]*$')
        ])],
      roles: ['', [Validators.required]],
    });
    
  }
  ngOnInit(): void {}
  submitForm() {
    this.makeSubmit=true;
    //Validación
    if(this.formCreate.invalid){
     return;
    }
    console.log(this.formCreate.controls['roles'].value)
    if(this.formCreate.controls['roles'].value=='Cliente'){
      this.formCreate.controls['roles'].setValue([2]);
    }else if(this.formCreate.controls['roles'].value=='Vendedor'){
      this.formCreate.controls['roles'].setValue([3]);
    }else if(this.formCreate.controls['roles'].value=='Ambos'){
      this.formCreate.controls['roles'].setValue([2,3]);
    }

    console.log(this.formCreate.value)

    this.authService.createUser(this.formCreate.value)
    .subscribe((respuesta:any)=>{
      this.usuario=respuesta;
      this.router.navigate(['/usuario/login'],{
        //Mostrar un mensaje
        queryParams:{register:'true'},
      })
    })
  }
  onReset() {
    this.formCreate.reset();
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.formCreate.controls[control].hasError(error) &&
      this.formCreate.controls[control].invalid &&
      (this.makeSubmit || this.formCreate.controls[control].touched)
    );
  };
}
