import { Component } from '@angular/core';
import { InscriptionsService } from './inscriptions.service';
import { Store } from '@ngrx/store';
import { InscriptionsActions } from './store/inscriptions.actions';
import { selectInscriptions } from './store/inscriptions.selectors';
import { MatDialog } from '@angular/material/dialog';
import { InscriptionDialogComponent } from './components/inscription-dialog/inscription-dialog.component';
import { Inscription } from './models';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.scss'
})
export class InscriptionsComponent {
inscriptions$: any;
displayedColumns = ["user", "course"]
inscripciones: Inscription[] = [];

constructor(private store: Store, private matDialog: MatDialog, private inscriptionsService: InscriptionsService) {
  this.store.dispatch(InscriptionsActions.loadInscriptions());
  this.inscriptionsService.getInscriptions().subscribe({
    next: (inscriptions) => {
      this.inscriptions$ = inscriptions;
    }
  });
}

createInscription(): void {
  this.matDialog.open(InscriptionDialogComponent)
}

}
