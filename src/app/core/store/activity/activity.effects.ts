/**
 * @file activity.effects.ts
 * @description Define os efeitos (Effects) para comunicação assíncrona com o back-end
 *              usando o ActivityService. Responsável por despachar ações de sucesso ou falha.
 */

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { ActivityService } from '../../http/activity.service'; // Correct path
import * as ActivityActions from './activity.actions';
import { IResponseError } from '../../models/models.index';

@Injectable()
export class ActivityEffects {
  constructor(
    private actions$: Actions,
    private activityService: ActivityService
  ) {}

  loadActivities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActivityActions.loadActivities),
      // Use switchMap if you want to cancel previous load requests when filters change quickly
      // Use mergeMap if you want all requests to complete (e.g., loading different pages)
      switchMap((action) =>
        this.activityService.getAllActivities(action.filters).pipe(
          // TODO: If pagination metadata is needed, map the full response here
          // and dispatch a success action containing both activities and metadata.
          map((activities) => ActivityActions.loadActivitiesSuccess({ activities })),
          catchError((error: IResponseError) => of(ActivityActions.loadActivitiesFailure({ error })))
        )
      )
    )
  );

  loadActivityById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActivityActions.loadActivityById),
      switchMap((action) =>
        this.activityService.getActivity(action.id).pipe(
          map((activity) => ActivityActions.loadActivityByIdSuccess({ activity })),
          catchError((error: IResponseError) => of(ActivityActions.loadActivityByIdFailure({ error })))
        )
      )
    )
  );

  createActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActivityActions.createActivity),
      mergeMap((action) =>
        this.activityService.createActivity(action.activity).pipe(
          // Assuming success action doesn't need the created activity
          map(() => ActivityActions.createActivitySuccess()),
          // Optionally dispatch loadActivities again
          catchError((error: IResponseError) => of(ActivityActions.createActivityFailure({ error })))
        )
      )
    )
  );

  updateActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActivityActions.updateActivity),
      mergeMap((action) =>
        this.activityService.updateActivity(action.id, action.data).pipe(
          // Assuming success action doesn't need the updated activity
          map(() => ActivityActions.updateActivitySuccess()),
          catchError((error: IResponseError) => of(ActivityActions.updateActivityFailure({ error })))
        )
      )
    )
  );

  deleteActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActivityActions.deleteActivity),
      mergeMap((action) =>
        this.activityService.deleteActivity(action.id).pipe(
          // Assuming success action doesn't need the id
          map(() => ActivityActions.deleteActivitySuccess()),
          catchError((error: IResponseError) => of(ActivityActions.deleteActivityFailure({ error })))
        )
      )
    )
  );
}
