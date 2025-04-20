import { createAction, props } from '@ngrx/store';
import { IRating } from '../../models/models.index';

export const loadRatingById = createAction(
  '[Rating] Load Rating By ID',
  props<{ id: string }>()
);
export const loadRatingByIdSuccess = createAction(
  '[Rating] Load Rating By ID Success',
  props<{ rating: IRating }>()
);
export const loadRatingByIdFailure = createAction(
  '[Rating] Load Rating By ID Failure',
  props<{ error: any }>()
);

export const createRating = createAction(
  '[Rating] Create Rating',
  props<{ data: IRating }>()
);
export const createRatingSuccess = createAction('[Rating] Create Rating Success');
export const createRatingFailure = createAction(
  '[Rating] Create Rating Failure',
  props<{ error: any }>()
);

export const updateRating = createAction(
  '[Rating] Update Rating',
  props<{ id: string; data: Partial<IRating> }>()
);
export const updateRatingSuccess = createAction('[Rating] Update Rating Success');
export const updateRatingFailure = createAction(
  '[Rating] Update Rating Failure',
  props<{ error: any }>()
);

export const deleteRating = createAction(
  '[Rating] Delete Rating',
  props<{ id: string }>()
);
export const deleteRatingSuccess = createAction('[Rating] Delete Rating Success');
export const deleteRatingFailure = createAction(
  '[Rating] Delete Rating Failure',
  props<{ error: any }>()
);
