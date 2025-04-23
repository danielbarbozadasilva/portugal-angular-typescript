/**
 * @file activity.effects.ts
 * @description Define os efeitos (Effects) para comunicação assíncrona com o back-end
 *              usando o ActivityService. Responsável por despachar ações de sucesso ou falha.
 */

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';

import * as ActivityActions from './activity.actions';
import { ActivityService } from '../../../core/http/activity.service';

@Injectable()
export class ActivityEffects {
  constructor(
    private actions$: Actions,
    private activityService: ActivityService
  ) { }

  /**
   * Efeito para carregar atividades (com ou sem filtros).
   */
  loadActivities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActivityActions.loadActivities),
      mergeMap(({ filters }) =>
        this.activityService.getAllActivities(filters).pipe(
          map((activities) => ActivityActions.loadActivitiesSuccess({ activities })),
          catchError((error) => of(ActivityActions.loadActivitiesFailure({ error })))
        )
      )
    )
  );

  /**
   * Efeito para carregar uma atividade pelo ID.
   */
  loadActivityById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActivityActions.loadActivityById),
      mergeMap(({ id }) =>
        this.activityService.getActivity(id).pipe(
          map((activity) => ActivityActions.loadActivityByIdSuccess({ activity })),
          catchError((error) => of(ActivityActions.loadActivityByIdFailure({ error })))
        )
      )
    )
  );

  /**
   * Efeito para criar uma nova atividade.
   */
  createActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActivityActions.createActivity),
      mergeMap(({ activity }) =>
        this.activityService.createActivity(activity).pipe(
          map(() => ActivityActions.createActivitySuccess()),
          catchError((error) => of(ActivityActions.createActivityFailure({ error })))
        )
      )
    )
  );

  /**
   * Efeito para atualizar uma atividade existente.
   */
  updateActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActivityActions.updateActivity),
      mergeMap(({ id, data }) =>
        this.activityService.updateActivity(id, data).pipe(
          map(() => ActivityActions.updateActivitySuccess()),
          catchError((error) => of(ActivityActions.updateActivityFailure({ error })))
        )
      )
    )
  );

  /**
   * Efeito para deletar uma atividade existente.
   */
  deleteActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActivityActions.deleteActivity),
      mergeMap(({ id }) =>
        this.activityService.deleteActivity(id).pipe(
          map(() => ActivityActions.deleteActivitySuccess()),
          catchError((error) => of(ActivityActions.deleteActivityFailure({ error })))
        )
      )
    )
  );
}
