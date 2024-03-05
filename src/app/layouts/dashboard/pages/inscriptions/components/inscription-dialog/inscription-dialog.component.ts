import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { InscriptionsActions } from '../../store/inscriptions.actions';
import { Observable } from 'rxjs';
import { User } from '../../../users/modelos';
import { selectInscriptionCurso, selectInscriptionUser } from '../../store/inscriptions.selectors';
import { Curso } from '../../../cursos/models';

@Component({
  selector: 'app-inscription-dialog',
  templateUrl: './inscription-dialog.component.html',
  styleUrl: './inscription-dialog.component.scss'
})
export class InscriptionDialogComponent {
  users$: Observable<User[]>
  cursos$: Observable<Curso[]>

  constructor(private store: Store) {
    this.store.dispatch(InscriptionsActions.loadUsuarios());
    this.store.dispatch(InscriptionsActions.loadCursos());
    this.users$ = this.store.select(selectInscriptionUser);
    this.cursos$ = this.store.select(selectInscriptionCurso);
  }
}
