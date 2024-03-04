import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionsActions } from './inscriptions.actions';
import { Inscription } from '../models';

export const inscriptionsFeatureKey = 'inscriptions';

export interface State {
inscriptions: Inscription[];
error: unknown;

}

export const initialState: State = {
  inscriptions: [],
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(InscriptionsActions.loadInscriptions, state => state),
  on(InscriptionsActions.loadInscriptionsSuccess, (state, action) => ({...state, inscriptions: action.data})),
  on(InscriptionsActions.loadInscriptionsFailure, (state, action) => ({...state, error: action.error})),
);

export const inscriptionsFeature = createFeature({
  name: inscriptionsFeatureKey,
  reducer,
});

