import { createAction, props } from '@ngrx/store';
import { IContentPage } from '../../models/models.index';

export const loadContentPages = createAction(
  '[ContentPage] Load Content Pages'
);

export const loadContentPagesSuccess = createAction(
  '[ContentPage] Load Content Pages Success',
  props<{ pages: IContentPage[] }>()
);

export const loadContentPagesFailure = createAction(
  '[ContentPage] Load Content Pages Failure',
  props<{ error: any }>()
);

export const loadContentPageById = createAction(
  '[ContentPage] Load Content Page By ID',
  props<{ id: string }>()
);

export const loadContentPageByIdSuccess = createAction(
  '[ContentPage] Load Content Page By ID Success',
  props<{ page: IContentPage }>()
);

export const loadContentPageByIdFailure = createAction(
  '[ContentPage] Load Content Page By ID Failure',
  props<{ error: any }>()
);

export const updateContentPage = createAction(
  '[ContentPage] Update Content Page',
  props<{ id: string; data: Partial<IContentPage> }>()
);

export const updateContentPageSuccess = createAction(
  '[ContentPage] Update Content Page Success'
);

export const updateContentPageFailure = createAction(
  '[ContentPage] Update Content Page Failure',
  props<{ error: any }>()
);

export const removeContentPage = createAction(
  '[ContentPage] Remove Content Page',
  props<{ id: string }>()
);

export const removeContentPageSuccess = createAction(
  '[ContentPage] Remove Content Page Success'
);

export const removeContentPageFailure = createAction(
  '[ContentPage] Remove Content Page Failure',
  props<{ error: any }>()
);
