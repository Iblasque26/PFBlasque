import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of, concat } from 'rxjs';
import { InscriptionsActions } from './inscriptions.actions';
import { InscriptionsService } from '../inscriptions.service';
import { UsersService } from '../../../../../core/services/users.service';
import { CursosService } from '../../cursos/cursos.service';


@Injectable()
export class InscriptionsEffects {

  loadInscriptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionsActions.loadInscriptions),
      concatMap(() =>
        this.inscriptionsService.getInscriptions().pipe(
          map((data) => InscriptionsActions.loadInscriptionsSuccess({ data })),
          catchError((error) => of(InscriptionsActions.loadInscriptionsFailure({ error }))))
      )
    );
  });

  loadUsuario$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.loadUsuarios),
      concatMap(() =>
        this.usersService.getAllUsers().pipe(map((resp) => InscriptionsActions.loadUsuariosSuccess({ data: resp })),
          catchError((error) => {
            return of(InscriptionsActions.loadUsuariosFailure({ error }))
          })
        ))
    );
  });

  loadCurso$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.loadCursos),
      concatMap(() => {
        return this.cursosService.getCursos().pipe(
          map((resp) => InscriptionsActions.loadCursosSuccess({ data: resp })),
          catchError((error) =>
            of(InscriptionsActions.loadCursosFailure({ error }))
          )
        )
      })
    )
  });

  createInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.createInscription),
      concatMap((action) => {
        return this.inscriptionsService.createInscription(action.data).pipe(
          map((resp) => InscriptionsActions.createInscriptionSuccess({data : resp})),
          catchError((error) => of(InscriptionsActions.createInscriptionFailure({error})))
        )
      })
    )
  });

  createInscriptionSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.createInscriptionSuccess),
      map(() => InscriptionsActions.loadInscriptions())
    );
  });

  constructor(private actions$: Actions, private inscriptionsService: InscriptionsService, private usersService: UsersService, private cursosService: CursosService) { }
}
