import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';
import { LocacionService } from 'src/app/share/locacion.service';

@Component({
  selector: 'app-user-direcciones',
  templateUrl: './user-direcciones.component.html',
  styleUrls: ['./user-direcciones.component.css']
})
export class UserDireccionesComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  titleForm: string = 'Registrar';
  //Nombre del formulario
  direccionesForm: FormGroup;
  //lista de roles para cargar en pantalla
  roles: any;
  //lista de roles seleccionados
  rolesSeleccionados: any[] = [];
  makeSubmit: boolean = false;
  respuestaAPI: any;


  provincias: any[] = [];
  cantones: any[] = [];
  distritos: any[] = [];

  selectedProvince: string = "";
  selectedCanton: string = "";
  selectedDistrict: string = "";
  currentUser:any
  isUser: boolean;

  constructor(private locacionService: LocacionService,
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private authService: AuthenticationService) {
      this.formularioReactive();
  }

  ngOnInit() {
    this.locacionService.getProvincias().subscribe((provincias: any) => {
      const item: { id: string, nombre: string }[] = [];
      for (let id_Provincia in provincias) {
        item.push({ id: id_Provincia, nombre: provincias[id_Provincia] })
      }
      console.log(item);
      this.provincias = item;
    });
     //Subscripciona la informacion del usuario actual 
     this.authService.currentUser.subscribe((x) => (this.currentUser = x))
     console.log("usuario: ", this.currentUser)
    //this.checkRoles
  }

  checkRoles() {
    console.log(this.currentUser)
    if (this.currentUser == null) {
      console.log('no roles')
      this.isUser = false
    } else {
      this.currentUser.user.roles.forEach(element => {
        if (element.tipo == "Cliente") {
          console.log('isUser: ', this.isUser)
          this.isUser = true
        }
      });

    }



  }

  //Crear Formulario
  formularioReactive() {
    //[null, Validators.required]
    this.direccionesForm = this.fb.group({
      //Input type hidden
      //id: [null, null],
      provincia: [null, Validators.required],
      canton:[null, Validators.required],
      distrito:[null, Validators.required],
      direccion: [null,
        Validators.compose([
          Validators.required, Validators.minLength(10), Validators.maxLength(200)
        ])
      ],
      codigoPostal: [null,
        Validators.compose([
          Validators.required, Validators.minLength(4), Validators.maxLength(5)
        ])
      ],
      telefono: [null,
        Validators.compose([
          Validators.required, Validators.minLength(4), Validators.maxLength(8)
        ])
      ],
      clienteId: [null, null],
    });
  }

  onProvinceChange(event: any) {
    let provinceId = event.value;
    this.selectedProvince = provinceId;
    this.selectedCanton = '';

    if (provinceId) {
      this.locacionService.getCantones(parseInt(provinceId)).subscribe((cantones: any) => {
        const itemCanton: { id: string, nombre: string }[] = [];
        for (let id_Canton in cantones) {
          itemCanton.push({ id: id_Canton, nombre: cantones[id_Canton] });
        }
        this.cantones = itemCanton;
        //this.direccionesForm.patchValue({canton:this.cantones});
        console.log(cantones);
        this.distritos = [];
      });
    } else {
      this.cantones = [];
      this.distritos = [];
    }
  }

  onCantonChange(event: any) {
    let cantonId = event.value;
    this.selectedCanton = cantonId;
    if (cantonId) {
      this.locacionService.getDistritos(parseInt(this.selectedProvince), parseInt(this.selectedCanton))
        .subscribe((distritos: any) => {
          const itemDistrito: { id: string, nombre: string }[] = [];
          for (let id_Distrito in distritos) {
            itemDistrito.push({ id: id_Distrito, nombre: distritos[id_Distrito] })
          }
          this.distritos = itemDistrito;
        });
    } else {
      this.distritos = [];
    }
  }

  onDistrictChange(event: any) {
    let distritoId = event.value;
    this.selectedDistrict = distritoId;
    console.log(this.selectedDistrict);
  }

  guardarDireccion():void{
    this.makeSubmit = true;
    if (this.direccionesForm.invalid) {
      console.log("FORM NO VALIDO");
      return;
    }
    this.direccionesForm.patchValue({clienteId: this.currentUser.user.id});      
    this.gService.create('direcciones',this.direccionesForm.value)
    .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //Obtener respuesta
        this.respuestaAPI = data;
        console.log(data);
        this.router.navigate(['/productos'], {
        });
      });
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.direccionesForm.controls[control].hasError(error) &&
      this.direccionesForm.controls[control].invalid &&
      (this.makeSubmit || this.direccionesForm.controls[control].touched)
    );
  };

}
