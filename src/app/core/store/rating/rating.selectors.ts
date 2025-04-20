import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RatingState } from './rating.reducer';

export const selectRatingState = createFeatureSelector<RatingState>('rating');

export const selectRatingLoading = createSelector(
  selectRatingState,
  (state) => state.loading
);

export const selectCurrentRating = createSelector(
  selectRatingState,
  (state) => state.rating
);

export const selectRatingError = createSelector(
  selectRatingState,
  (state) => state.error
);
