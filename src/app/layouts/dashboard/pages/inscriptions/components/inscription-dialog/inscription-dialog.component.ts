import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { InscriptionsActions } from '../../store/inscriptions.actions';
import { Observable } from 'rxjs';
import { User } from '../../../users/modelos';
import { selectInscriptionCurso, selectInscriptionUser } from '../../store/inscriptions.selectors';
import { Curso } from '../../../cursos/models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-inscription-dialog',
  templateUrl: './inscription-dialog.component.html',
  styleUrl: './inscription-dialog.component.scss'
})
export class InscriptionDialogComponent {
  users$: Observable<User[]>
  cursos$: Observable<Curso[]>

  inscriptionForm: FormGroup;

  constructor(private store: Store, private formBuilder: FormBuilder, private matDialogRef: MatDialogRef<InscriptionDialogComponent>) {
this.inscriptionForm = this.formBuilder.group({
  courseId: this.formBuilder.control(''),
  userId: this.formBuilder.control(''),
})

    this.store.dispatch(InscriptionsActions.loadUsuarios());
    this.store.dispatch(InscriptionsActions.loadCursos());
    this.users$ = this.store.select(selectInscriptionUser);
    this.cursos$ = this.store.select(selectInscriptionCurso);
  }

  onSubmit(): void {
    if (this.inscriptionForm.invalid) {
      this.inscriptionForm.markAllAsTouched();
    } else {
      this.store.dispatch(InscriptionsActions.createInscription({data: this.inscriptionForm.value}))
    };
    this.matDialogRef.close();
  }
}
