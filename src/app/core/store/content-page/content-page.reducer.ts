import { createReducer, on } from '@ngrx/store';
import * as ContentPageActions from './content-page.actions';
import { IContentPage } from '../../models/models.index';

export interface ContentPageState {
  loading: boolean;
  all: IContentPage[];
  selected?: IContentPage;
  error?: string;
}

const initialState: ContentPageState = {
  loading: false,
  all: [],
  selected: undefined,
  error: undefined
};

export const contentPageReducer = createReducer(
  initialState,

  on(ContentPageActions.loadContentPages, (state) => ({
    ...state,
    loading: true,
    error: undefined
  })),
  on(ContentPageActions.loadContentPagesSuccess, (state, { pages }) => ({
    ...state,
    loading: false,
    all: pages
  })),
  on(ContentPageActions.loadContentPagesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(ContentPageActions.loadContentPageById, (state) => ({
    ...state,
    loading: true
  })),
  on(ContentPageActions.loadContentPageByIdSuccess, (state, { page }) => ({
    ...state,
    loading: false,
    selected: page
  })),
  on(ContentPageActions.loadContentPageByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(ContentPageActions.updateContentPage, (state) => ({
    ...state,
    loading: true
  })),
  on(ContentPageActions.updateContentPageSuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(ContentPageActions.updateContentPageFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(ContentPageActions.removeContentPage, (state) => ({
    ...state,
    loading: true
  })),
  on(ContentPageActions.removeContentPageSuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(ContentPageActions.removeContentPageFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
