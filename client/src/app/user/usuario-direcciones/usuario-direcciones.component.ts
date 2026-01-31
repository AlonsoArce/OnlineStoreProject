import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { LocacionService } from 'src/app/share/locacion.service';

@Component({
  selector: 'app-usuario-direcciones',
  templateUrl: './usuario-direcciones.component.html',
  styleUrls: ['./usuario-direcciones.component.css']
})
export class UsuarioDireccionesComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  titleForm: string = 'Registrar';
  //Nombre del formulario
  vendedorForm: FormGroup;
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

  constructor(private locacionService: LocacionService,
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute,) {
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
  }
  onProvinceChange(event: any) {
    let provinceId = event.target.value;
    this.selectedProvince = provinceId;
    this.selectedCanton = '';

    if (provinceId) {
      this.locacionService.getCantones(parseInt(provinceId)).subscribe((cantones: any) => {
        const itemCanton: { id: string, nombre: string }[] = [];
        for (let id_Canton in cantones) {
          itemCanton.push({ id: id_Canton, nombre: cantones[id_Canton] });
        }
        this.cantones = itemCanton;
        console.log(cantones);
        this.distritos = [];
      });
    } else {
      this.cantones = [];
      this.distritos = [];
    }
  }

  onCantonChange(event: any) {
    let cantonId = event.target.value;
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
    let distritoId = event.target.value;
    this.selectedDistrict = distritoId;
    console.log(this.selectedDistrict);
  }



  submitForm() {
    this.makeSubmit = true;
    if (this.vendedorForm.invalid) {
      return;
    }
    //se obtienen los valores de cada campo
    let nombreCompleto = this.vendedorForm.get('nombreCompleto').value;
    let identificacion = this.vendedorForm.get('identificacion').value;
    let telefono = this.vendedorForm.get('numeroTelefono').value;
    let correoElectronico = this.vendedorForm.get('correoElectronico').value;
    let contrasena = this.vendedorForm.get('contrasena').value;
    let nombreProveedor = this.vendedorForm.get('nombreProveedor').value;
    let rFormat: any[] = this.vendedorForm.get('roles').value;
    let rolesList = rFormat.map((x) => ({ ['id']: x }));
    //rFormat=this.vendedorForm.get('roles').value.map((x:number)=>({['id']: x}));
    this.rolesSeleccionados = rolesList;
    //informacion de la direcciones
    let provincia = this.selectedProvince;
    let canton = this.selectedCanton;
    let distrito = this.selectedDistrict;
    let direccion = this.vendedorForm.get('direccion').value;
    let codigoPostal = this.vendedorForm.get('codigoPostal').value;
    let direcciones = {
      ['provincia']: provincia,
      ['canton']: canton,
      ['distrito']: distrito,
      ['direccion']: direccion,
      ['codigoPostal']: codigoPostal,
      ['telefono']: telefono,
    }

    let usuarioInfo = {
      ['nombreCompleto']: nombreCompleto,
      ['identificacion']: identificacion,
      ['numeroTelefono']: telefono,
      ['correoElectronico']: correoElectronico,
      ['contrasena']: contrasena,
      ['nombreProveedor']: nombreProveedor,
      ['roles']: this.rolesSeleccionados,
      ['direcciones']: direcciones
    }
  }

  //   this.gService.create('usuarios/registrar',usuarioInfo)
  //   .pipe(takeUntil(this.destroy$))
  //     .subscribe((data: any) => {
  //       //Obtener respuesta
  //       this.respuestaAPI = data;
  //       console.log(data);
  //       this.router.navigate(['/productos'], {
  //       });
  //     });
  // }



  onReset() {
    this.vendedorForm.reset();
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.vendedorForm.controls[control].hasError(error) &&
      this.vendedorForm.controls[control].invalid &&
      (this.makeSubmit || this.vendedorForm.controls[control].touched)
    );
  };
}
