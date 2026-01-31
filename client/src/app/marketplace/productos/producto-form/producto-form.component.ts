import { HttpClient } from '@angular/common/http';
import { Binary } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements OnInit {
  currentUser: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  //Titulo
  titleForm: string = 'Crear';
  //Lista de categorias
  categorias: any;
  //Id del vendedor
  vendedorId: any;
  //Producto a actualizar
  productoInfo: any;
  //Respuesta del API crear/modificar
  respAPIProducto: any;
  //Sí es submit 
  submitted = false;
  //Nombre del formulario
  productoForm: FormGroup;
  //id del Producto
  idProducto: number = 0;
  //Sí es crear
  isCreate: boolean = true;
  //este arreglo es para guardar las imagenes seleccionadas
  selectedFiles: File[] = [];
  images: any = [];

  //esta lista es para cargar los estado en un select
  listEstados: string[] =
    ['Nuevo', 'Usado-Como nuevo', 'Usado-Buen estado', 'Usado-Aceptable'];

  //se define los parametros del contructor
  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private http: HttpClient, 
    private authService: AuthenticationService,

  ) {
    this.formularioReactive();
  }

  ngOnInit(): void {
    //Verificar si hay parametros
    this.activeRouter.params.subscribe((params: Params) => {
      //se guarda el id del producto en la propiedad idProducto
      this.idProducto = params['id'];
      if (this.idProducto !== undefined) {
        //quiere decir que hay que actualizar
        this.isCreate = false;
        this.titleForm = "Actualizar";
        //Obtener el producto del API, el que se va a actualizar
        this.gService
          .get('productos', this.idProducto) // productos/1
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            console.log(data);
            this.productoInfo = data;
            console.log(this.productoInfo);
            //Establecer valor de cada entrada
            this.productoForm.setValue({
              id: this.productoInfo.id,
              nombre: this.productoInfo.nombre,
              descripcion: this.productoInfo.descripcion,
              precio: this.productoInfo.precio,
              cantidad: this.productoInfo.cantidad,
              estado: this.productoInfo.estado,
              categoriaId: this.productoInfo.categoria.id,
              vendedorId: this.productoInfo.vendedor.id,
              //fotos:this.productoInfo.fotos,
            })
            console.log(this.productoForm.value);
          });
      }
    })
      //Subscripciona la informacion del usuario actual 
      this.authService.currentUser.subscribe((x)=>(this.currentUser=x))
      console.log("usuario: ",this.currentUser)
  }

  //Crear Formulario
  formularioReactive() {
    //[null, Validators.required]
    this.productoForm = this.fb.group({
      //Input type hidden
      id: [null, null],
      nombre: [null,
        Validators.compose([
          Validators.required, Validators.minLength(10)
        ])
      ],
      descripcion: [null,
        Validators.compose([
          Validators.required, Validators.minLength(15), Validators.maxLength(200)
        ])
      ],
      precio: [null,
        Validators.compose([
          Validators.required, Validators.minLength(4), Validators.maxLength(6), Validators.pattern('^[0-9]*$')
        ])
      ],
      cantidad: [null,
        Validators.compose([
          Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern('^[0-9]*$')
        ])
      ],
      estado: [null, Validators.required],
      categoriaId: [null, Validators.required],
      vendedorId: [null, null],
      //fotos: [null, null],
    })
    this.getCategorias();
  }

  //generar la lista de categorias
  getCategorias() {
    this.categorias = null;
    this.gService
      .list('categorias')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.categorias = data;
      });
  }

  public errorHandling = (control: string, error: string) => {
    return this.productoForm.controls[control].hasError(error);
  };

  //Crear Producto
  crearProducto(): void {
    //Establecer submit verdadero
    this.submitted = true;
    //Verificar validación
    if (this.productoForm.invalid) {
      return;
    }
    let nombre = this.productoForm.get('nombre').value;
    let descripcion = this.productoForm.get('descripcion').value;
    //se convierte el valor de precio a float
    let precioParse = parseFloat(this.productoForm.get('precio').value);
    this.productoForm.patchValue({ precio: precioParse });
    let cantidadParse = parseInt(this.productoForm.get('cantidad').value);
    this.productoForm.patchValue({ cantidad: cantidadParse });
    let estado = this.productoForm.get('estado').value;
    let categoriaId = this.productoForm.get('categoriaId').value;
    this.vendedorId = this.currentUser.user.id;
    //se le asigna el vendedorId al formulario
    this.productoForm.patchValue({ vendedorId: this.vendedorId })
    //Accion API create enviando toda la informacion del formulario
    console.log(this.productoForm.value);
    //aqui se crea un formdata para guardar las imagenes
    const formData = new FormData();
    //recorro el arreglo de files
    if (this.images != null) {
      for (const file of this.selectedFiles) {
        formData.append('images', file, file.name);
      }
      //envio las imagenes a la carpeta del servidor
      this.http.post('http://localhost:3000/upload', formData).subscribe(
        (response) => {
          // Handle success response from the server
          console.log('Producto guardado con éxito', response);
        },
        (error) => {
          // Handle error response from the server
          console.error('Error al guardar el producto', error);
        }
      )
      let arregloFotos = this.images;
      let fotos = arregloFotos.map(
        x => ({
          'url': "/uploads/" + x,
        })
      )
      console.log(fotos);
      let productoInfo = {
        'nombre': nombre,
        'descripcion': descripcion,
        'precio': precioParse,
        'cantidad': cantidadParse,
        'estado': estado,
        'categoriaId': categoriaId,
        'vendedorId': this.vendedorId,
        'fotos': fotos
      }

      this.gService.create('productos', productoInfo)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.respAPIProducto = data;
          console.log(data);
          console.log("Producto guardado correctamente")
          this.router.navigate(['/productos/vendedor/',this.currentUser.user.id], {
            queryParams: { create: 'true' }
          });
        });
    } else {

    }

  }

  //Actualizar Producto
  actualizarProducto(): void {
    //Establecer submit verdadero
    this.submitted = true;
    //Verificar validación
    if (this.productoForm.invalid) {
      return;
    }

    let precioParse = parseFloat(this.productoForm.get('precio').value);
    this.productoForm.patchValue({ precio: precioParse });
    let cantidadParse = parseInt(this.productoForm.get('cantidad').value);
    this.productoForm.patchValue({ cantidad: cantidadParse });
    //antes de hacer el update del producto
    //debe validarse varios puntos:
    //1 si las imagenes que se quieren agregar son nuevas
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      this.gService.delete('fotos', this.idProducto)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          //this.respAPIProducto = data;
          console.log(data);
        });

      const formData = new FormData();
      //recorro el arreglo de files
      for (const file of this.selectedFiles) {
        formData.append('images', file, file.name);
      }
      //envio las imagenes a la carpeta del servidor para almacenarlas
      this.http.post('http://localhost:3000/upload', formData).subscribe(
        (response) => {
          // Handle success response from the server
          console.log('Producto guardado con éxito', response);
        },
        (error) => {
          // Handle error response from the server
          console.error('Error al guardar el producto', error);
        }
      )
      //se creae el array de nuevas fotos
      console.log("Este es una prueba de array de fotos")
      //let arregloFotos = this.images;
      let foto = this.images.map(
        x => ({
          ['url']: "/uploads/" + x,
          ['productoId']: Number(this.idProducto),
        })
      )
      console.log(foto);
      this.gService.create('fotos', foto)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.respAPIProducto = data;
          console.log(data);
        });

      console.log(this.productoForm.value);
      this.gService.update('productos', this.productoForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          //this.respAPIProducto = data;
          console.log(data);
          this.router.navigate(['/productos'], {
            queryParams: { update: 'true' }
          });
        });
    } else {

      console.log(this.productoForm.value);
      this.gService.update('productos', this.productoForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          //this.respAPIProducto = data;
          console.log(data);
          this.router.navigate(['/productos/vendedor/',this.currentUser.user.id], {
            queryParams: { update: 'true' }
          });
        });
    }




  }

  onReset() {
    this.submitted = false;
    this.productoForm.reset();
  }
  onBack() {
    this.router.navigate(['/productos/vendedores']);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }

  onFileChange(event: any) {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      for (const file of this.selectedFiles) {
        this.images.push(file.name);
        console.log(this.images);
      }
    }
  }


}
