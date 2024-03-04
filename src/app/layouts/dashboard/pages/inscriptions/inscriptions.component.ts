import { Component } from '@angular/core';
import { InscriptionsService } from './inscriptions.service';
import { Store } from '@ngrx/store';
import { InscriptionsActions } from './store/inscriptions.actions';
import { selectInscriptions } from './store/inscriptions.selectors';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.scss'
})
export class InscriptionsComponent {
inscriptions$: any;

constructor(private store: Store) {
  this.inscriptions$ = this.store.select(selectInscriptions);
  this.store.dispatch(InscriptionsActions.loadInscriptions())
}

}
