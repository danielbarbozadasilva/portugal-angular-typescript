import { createReducer, on } from '@ngrx/store';
import * as ContentPageActions from './content-page.actions';
import { IContentPage, IResponseError } from '../../models/models.index'; // Import IResponseError

export interface ContentPageState {
  loading: boolean;
  all: IContentPage[];
  selected?: IContentPage;
  error?: IResponseError | string; // Allow IResponseError or string
}

const initialState: ContentPageState = {
  loading: false,
  all: [],
  selected: undefined,
  error: undefined,
};

export const contentPageReducer = createReducer(
  initialState,

  on(ContentPageActions.loadContentPages, (state) => ({
    ...state,
    loading: true,
    error: undefined,
  })),
  on(ContentPageActions.loadContentPagesSuccess, (state, { pages }) => ({
    ...state,
    loading: false,
    all: pages,
  })),
  on(ContentPageActions.loadContentPagesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error.message || 'Failed to load content pages', // Store error message or the object
  })),

  on(ContentPageActions.loadContentPageById, (state) => ({
    ...state,
    loading: true,
  })),
  on(ContentPageActions.loadContentPageByIdSuccess, (state, { page }) => ({
    ...state,
    loading: false,
    selected: page,
  })),
  on(ContentPageActions.loadContentPageByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error.message || 'Failed to load content page by ID', // Store error message or the object
  })),

  on(ContentPageActions.updateContentPage, (state) => ({
    ...state,
    loading: true,
  })),
  on(ContentPageActions.updateContentPageSuccess, (state, { page }) => ({
    ...state,
    loading: false,
    // Optionally update the 'all' array or 'selected' page
    all: state.all.map((p) => (p._id === page._id ? page : p)),
    selected: state.selected?._id === page._id ? page : state.selected,
  })),
  on(ContentPageActions.updateContentPageFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error.message || 'Failed to update content page', // Store error message or the object
  })),

  on(ContentPageActions.removeContentPage, (state) => ({
    ...state,
    loading: true,
  })),
  on(ContentPageActions.removeContentPageSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    all: state.all.filter((p) => p._id !== id),
    selected: state.selected?._id === id ? undefined : state.selected,
  })),
  on(ContentPageActions.removeContentPageFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error.message || 'Failed to remove content page', // Store error message or the object
  }))
);
