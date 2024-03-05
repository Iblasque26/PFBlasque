import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionsActions } from './inscriptions.actions';
import { Inscription } from '../models';
import { User } from '../../users/modelos';
import { Curso } from '../../cursos/models';

export const inscriptionsFeatureKey = 'inscriptions';

export interface State {
inscriptions: Inscription[];
error: unknown;
users: User[];
cursos: Curso[];
}

export const initialState: State = {
  inscriptions: [],
  users: [],
  error: null,
  cursos: [],
};

export const reducer = createReducer(
  initialState,
  on(InscriptionsActions.loadInscriptions, state => state),
  on(InscriptionsActions.loadInscriptionsSuccess, (state, action) => ({...state, inscriptions: action.data})),
  on(InscriptionsActions.loadInscriptionsFailure, (state, action) => ({...state, error: action.error})),
  on(InscriptionsActions.loadUsuariosSuccess, (state, action) => {return {...state, users: action.data}}),
  on(InscriptionsActions.loadCursosSuccess, (state, action) => {return {...state, cursos: action.data}}),
);

export const inscriptionsFeature = createFeature({
  name: inscriptionsFeatureKey,
  reducer,
});

