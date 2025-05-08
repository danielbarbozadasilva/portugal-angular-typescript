import { createReducer, on } from '@ngrx/store';
import * as RatingActions from './rating.actions';
import { IRating } from '../../models/models.index';

export interface RatingState {
  loading: boolean;
  rating?: IRating;
  error?: string;
}

const initialState: RatingState = {
  loading: false,
  rating: undefined,
  error: undefined
};

export const ratingReducer = createReducer(
  initialState,

  on(RatingActions.loadRatingById, (state) => ({
    ...state,
    loading: true
  })),
  on(RatingActions.loadRatingByIdSuccess, (state, { rating }) => ({
    ...state,
    loading: false,
    rating
  })),
  on(RatingActions.loadRatingByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(RatingActions.createRating, (state) => ({
    ...state,
    loading: true
  })),
  on(RatingActions.createRatingSuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(RatingActions.createRatingFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(RatingActions.updateRating, (state) => ({
    ...state,
    loading: true
  })),
  on(RatingActions.updateRatingSuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(RatingActions.updateRatingFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(RatingActions.deleteRating, (state) => ({
    ...state,
    loading: true
  })),
  on(RatingActions.deleteRatingSuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(RatingActions.deleteRatingFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
