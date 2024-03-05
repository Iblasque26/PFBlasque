import { Component } from '@angular/core';
import { InscriptionsService } from './inscriptions.service';
import { Store } from '@ngrx/store';
import { InscriptionsActions } from './store/inscriptions.actions';
import { selectInscriptions } from './store/inscriptions.selectors';
import { MatDialog } from '@angular/material/dialog';
import { InscriptionDialogComponent } from './components/inscription-dialog/inscription-dialog.component';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.scss'
})
export class InscriptionsComponent {
inscriptions$: any;

constructor(private store: Store, private matDialog: MatDialog) {
  this.inscriptions$ = this.store.select(selectInscriptions);
  this.store.dispatch(InscriptionsActions.loadInscriptions())
}

createInscription(): void {
  this.matDialog.open(InscriptionDialogComponent)
}

}
