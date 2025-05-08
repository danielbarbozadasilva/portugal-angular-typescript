import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ContentPageState } from './content-page.reducer';

export const selectContentPageState = createFeatureSelector<ContentPageState>('contentPage');

export const selectContentPageLoading = createSelector(
  selectContentPageState,
  (state) => state.loading
);

export const selectAllContentPages = createSelector(
  selectContentPageState,
  (state) => state.all
);

export const selectSelectedContentPage = createSelector(
  selectContentPageState,
  (state) => state.selected
);

export const selectContentPageError = createSelector(
  selectContentPageState,
  (state) => state.error
);
