import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RatingService } from '../../../core/http/rating.service';
import * as RatingActions from './rating.actions';
import { mergeMap, map, catchError, of } from 'rxjs';

@Injectable()
export class RatingEffects {
  constructor(
    private actions$: Actions,
    private ratingService: RatingService
  ) {}

  loadRatingById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RatingActions.loadRatingById),
      mergeMap(({ id }) =>
        this.ratingService.getRating(id).pipe(
          map(rating => RatingActions.loadRatingByIdSuccess({ rating })),
          catchError(error => of(RatingActions.loadRatingByIdFailure({ error })))
        )
      )
    )
  );

  createRating$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RatingActions.createRating),
      mergeMap(({ data }) =>
        this.ratingService.createRating(data).pipe(
          map(() => RatingActions.createRatingSuccess()),
          catchError(error => of(RatingActions.createRatingFailure({ error })))
        )
      )
    )
  );

  updateRating$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RatingActions.updateRating),
      mergeMap(({ id, data }) =>
        this.ratingService.updateRating(id, data).pipe(
          map(() => RatingActions.updateRatingSuccess()),
          catchError(error => of(RatingActions.updateRatingFailure({ error })))
        )
      )
    )
  );

  deleteRating$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RatingActions.deleteRating),
      mergeMap(({ id }) =>
        this.ratingService.deleteRating(id).pipe(
          map(() => RatingActions.deleteRatingSuccess()),
          catchError(error => of(RatingActions.deleteRatingFailure({ error })))
        )
      )
    )
  );
}
