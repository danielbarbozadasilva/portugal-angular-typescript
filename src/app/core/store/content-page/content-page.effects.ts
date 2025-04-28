import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { ContentPageService } from '../../http/content-page.service'; // Correct path
import * as ContentPageActions from './content-page.actions';
import { IResponseError } from '../../models/models.index';

@Injectable()
export class ContentPageEffects {
  constructor(
    private actions$: Actions,
    private contentPageService: ContentPageService
  ) {}

  loadContentPages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContentPageActions.loadContentPages),
      mergeMap(() =>
        this.contentPageService.getAllContentPages().pipe(
          map((pages) => ContentPageActions.loadContentPagesSuccess({ pages })),
          catchError((error: IResponseError) => of(ContentPageActions.loadContentPagesFailure({ error })))
        )
      )
    )
  );

  loadContentPageById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContentPageActions.loadContentPageById),
      switchMap((action) =>
        this.contentPageService.getContentPage(action.id).pipe(
          map((page) => ContentPageActions.loadContentPageByIdSuccess({ page })),
          catchError((error: IResponseError) => of(ContentPageActions.loadContentPageByIdFailure({ error })))
        )
      )
    )
  );

  updateContentPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContentPageActions.updateContentPage),
      mergeMap((action) =>
        this.contentPageService.updateContentPage(action.id, action.data).pipe(
          map((page) => ContentPageActions.updateContentPageSuccess({ page })),
          catchError((error: IResponseError) => of(ContentPageActions.updateContentPageFailure({ error })))
        )
      )
    )
  );

  removeContentPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContentPageActions.removeContentPage),
      mergeMap((action) =>
        this.contentPageService.deleteContentPage(action.id).pipe(
          map(({ id }) => ContentPageActions.removeContentPageSuccess({ id })),
          catchError((error: IResponseError) => of(ContentPageActions.removeContentPageFailure({ error })))
        )
      )
    )
  );

  // Add create effect if create action/service method exists
  // createContentPage$ = createEffect(() => ... );
}
