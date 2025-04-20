import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ActivityActions from './activity.actions';
import { ActivityService } from '../../../core/http/activity.service';
import { mergeMap, map, catchError, of } from 'rxjs';

@Injectable()
export class ActivityEffects {
  constructor(
    private actions$: Actions,
    private activityService: ActivityService
  ) {}

  loadActivities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActivityActions.loadActivities),
      mergeMap(() =>
        this.activityService.getAllActivities().pipe(
          map((activities) => ActivityActions.loadActivitiesSuccess({ activities })),
          catchError((error) => of(ActivityActions.loadActivitiesFailure({ error })))
        )
      )
    )
  );

  loadActivityById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActivityActions.loadActivityById),
      mergeMap(({ id }) =>
        this.activityService.getActivity(id).pipe(
          map(activity => ActivityActions.loadActivityByIdSuccess({ activity })),
          catchError(error => of(ActivityActions.loadActivityByIdFailure({ error })))
        )
      )
    )
  );

  createActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActivityActions.createActivity),
      mergeMap(({ activity }) =>
        this.activityService.createActivity(activity).pipe(
          map(() => ActivityActions.createActivitySuccess()),
          catchError(error => of(ActivityActions.createActivityFailure({ error })))
        )
      )
    )
  );

  updateActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActivityActions.updateActivity),
      mergeMap(({ id, data }) =>
        this.activityService.updateActivity(id, data).pipe(
          map(() => ActivityActions.updateActivitySuccess()),
          catchError(error => of(ActivityActions.updateActivityFailure({ error })))
        )
      )
    )
  );

  deleteActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActivityActions.deleteActivity),
      mergeMap(({ id }) =>
        this.activityService.deleteActivity(id).pipe(
          map(() => ActivityActions.deleteActivitySuccess()),
          catchError(error => of(ActivityActions.deleteActivityFailure({ error })))
        )
      )
    )
  );
}
