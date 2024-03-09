import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Inscription, createInscriptionData } from '../models';
import { User } from '../../users/modelos';
import { Curso } from '../../cursos/models';


export const InscriptionsActions = createActionGroup({
  source: 'Inscriptions',
  events: {
    'Load Inscriptions': emptyProps(),
    'Load Inscriptions Success': props<{ data: Inscription[] }>(),
    'Load Inscriptions Failure': props<{ error: unknown }>(),
    'Load Usuarios': emptyProps(),
    'Load Usuarios Success': props<{data: User[]}>(),
    'Load Usuarios Failure': props<{error: unknown}>(),
    'Load Cursos': emptyProps(),
    'Load Cursos Success': props<{data: Curso[]}>(),
    'Load Cursos Failure': props<{error: unknown}>(),
    'Create Inscription': props<{ data: createInscriptionData}>(),
    'Create Inscription Success': props<{data: Inscription}>(),
    'Create Inscription Failure': props<{error: unknown}>(),

  }
});
