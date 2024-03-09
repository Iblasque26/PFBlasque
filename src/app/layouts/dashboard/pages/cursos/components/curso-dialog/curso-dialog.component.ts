import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { Curso } from '../../models';
import { MatButton } from '@angular/material/button';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatHint, MatSuffix } from '@angular/material/form-field';

@Component({
    selector: 'app-curso-dialog',
    templateUrl: './curso-dialog.component.html',
    styleUrl: './curso-dialog.component.scss',
    standalone: true,
    imports: [MatDialogTitle, MatDialogContent, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatDatepickerInput, MatHint, MatDatepickerToggle, MatSuffix, MatDatepicker, MatDialogActions, MatButton, MatDialogClose]
})
export class CursoDialogComponent {

  cursoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CursoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private editingCurso?: Curso
  ) {
    this.cursoForm = this.fb.group({
      cursoNombre: this.fb.control(''),
      createdAt: this.fb.control(''),
    });

    if (editingCurso) {
      this.cursoForm.patchValue(editingCurso);
    }
  }

  onSave(): void {
    this.dialogRef.close(this.cursoForm.value);
  }
}
