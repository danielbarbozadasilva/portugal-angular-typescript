import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActivityService } from '../../http/activity.service';
import { loadActivities, loadActivitiesSuccess, loadActivitiesFailure } from './activity.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ActivityEffects {
  loadActivities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadActivities),
      mergeMap(() =>
        this.activityService.getActivities().pipe(
          map((activities) => loadActivitiesSuccess({ activities })),
          catchError((error) => of(loadActivitiesFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private activityService: ActivityService
  ) {}
}
