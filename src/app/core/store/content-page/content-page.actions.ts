import { createAction, props } from '@ngrx/store';
import { IContentPage, IResponseError } from '../../models/models.index'; // Import IResponseError

export const loadContentPages = createAction('[ContentPage] Load All');
export const loadContentPagesSuccess = createAction(
  '[ContentPage] Load All Success',
  props<{ pages: IContentPage[] }>()
);
export const loadContentPagesFailure = createAction(
  '[ContentPage] Load All Failure',
  props<{ error: IResponseError }>() // Use IResponseError
);

export const loadContentPageById = createAction('[ContentPage] Load By ID', props<{ id: string }>());
export const loadContentPageByIdSuccess = createAction(
  '[ContentPage] Load By ID Success',
  props<{ page: IContentPage }>()
);
export const loadContentPageByIdFailure = createAction(
  '[ContentPage] Load By ID Failure',
  props<{ error: IResponseError }>() // Use IResponseError
);

export const updateContentPage = createAction(
  '[ContentPage] Update',
  props<{ id: string; data: Partial<IContentPage> }>()
);
// Add missing success/failure actions for update
export const updateContentPageSuccess = createAction(
  '[ContentPage] Update Success',
  props<{ page: IContentPage }>() // Return updated page
);
export const updateContentPageFailure = createAction(
  '[ContentPage] Update Failure',
  props<{ error: IResponseError }>() // Use IResponseError
);

// Add missing remove actions
export const removeContentPage = createAction('[ContentPage] Remove', props<{ id: string }>());
export const removeContentPageSuccess = createAction(
  '[ContentPage] Remove Success',
  props<{ id: string }>() // Pass ID to remove from state
);
export const removeContentPageFailure = createAction(
  '[ContentPage] Remove Failure',
  props<{ error: IResponseError }>() // Use IResponseError
);
