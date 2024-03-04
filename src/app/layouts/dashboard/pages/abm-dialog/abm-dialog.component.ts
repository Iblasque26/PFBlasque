import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { User } from '../users/modelos';
import { MatButton } from '@angular/material/button';
import { NgIf, NgFor } from '@angular/common';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';



@Component({
    selector: 'app-abm-dialog',
    templateUrl: './abm-dialog.component.html',
    styleUrls: ['./abm-dialog.component.scss'],
    standalone: true,
    imports: [MatDialogTitle, MatDialogContent, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatSelect, MatOption, NgIf, NgFor, MatDialogActions, MatButton, MatDialogClose]
})
export class AbmDialogComponent {
  userForm: FormGroup;
  curso = ['Angular', 'Js', 'Html', 'React'];

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<AbmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user?: User
  ) {
    this.userForm = this.fb.group({
      nombre: [this.user?.nombre || '', Validators.required],
      apellido: [this.user?.apellido || '', Validators.required],
      mail: [this.user?.mail || '', [Validators.required, Validators.email]],
      provincia: [this.user?.provincia || ''],
      rol: [this.user?.role], 
      curso: [this.user?.curso || []],
    });
  }

  get cursoControl(): FormControl | null {
    const control = this.userForm.get('curso');
    return control instanceof FormControl ? control : null;
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      const formValue = this.userForm.value;
      const newUser: User = {
        nombre: formValue.nombre,
        apellido: formValue.apellido,
        mail: formValue.mail,
        provincia: formValue.provincia,
        role: formValue.rol,
        curso: formValue.curso, 
        password: '',
        token: '',
      };
      this.matDialogRef.close(newUser);
    }
  }
}