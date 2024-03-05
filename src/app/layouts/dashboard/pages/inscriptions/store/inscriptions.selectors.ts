import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscriptions from './inscriptions.reducer';

export const selectInscriptionsState = createFeatureSelector<fromInscriptions.State>(
  fromInscriptions.inscriptionsFeatureKey
);


export const selectInscriptions = createSelector(
  selectInscriptionsState,
  (state) => state.inscriptions
);

export const selectInscriptionUser = createSelector(
  selectInscriptionsState,
  (state) => state.users
)

export const selectInscriptionCurso = createSelector(
  selectInscriptionsState,
  (state) => state.cursos
)