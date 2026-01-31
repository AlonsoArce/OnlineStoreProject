import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  mensaje: any;
  productoId: any;
  clienteId: any;
  respuesta: any;
  respPregunta: any
}


@Component({
  selector: 'app-comentarios-form',
  templateUrl: './comentarios-form.component.html',
  styleUrls: ['./comentarios-form.component.css']
})
export class ComentariosFormComponent {

  preguntaForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ComentariosFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    //this.formularioReactive();
  }

  formularioReactive() {
    //[null, Validators.required]
    this.preguntaForm = this.fb.group({
      mensaje: [null, Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],

    })
  }
  
  public errorHandling = (control: string, error: string) => {
    return this.preguntaForm.controls[control].hasError(error);
  };

  cerrarDialog(): void {
    this.data.mensaje = "jum"
    console.log("Mensaje:",this.data.mensaje)
    this.dialogRef.close();

  }

}

