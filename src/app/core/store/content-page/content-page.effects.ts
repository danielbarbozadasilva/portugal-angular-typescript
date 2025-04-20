import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ContentPageService } from '../../../core/http/content-page.service';
import * as ContentPageActions from './content-page.actions';
import { mergeMap, map, catchError, of } from 'rxjs';

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
          map(pages => ContentPageActions.loadContentPagesSuccess({ pages })),
          catchError(error => of(ContentPageActions.loadContentPagesFailure({ error })))
        )
      )
    )
  );

  loadContentPageById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContentPageActions.loadContentPageById),
      mergeMap(({ id }) =>
        this.contentPageService.getContentPage(id).pipe(
          map(page => ContentPageActions.loadContentPageByIdSuccess({ page })),
          catchError(error => of(ContentPageActions.loadContentPageByIdFailure({ error })))
        )
      )
    )
  );

  updateContentPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContentPageActions.updateContentPage),
      mergeMap(({ id, data }) =>
        this.contentPageService.updateContentPage(id, data).pipe(
          map(() => ContentPageActions.updateContentPageSuccess()),
          catchError(error => of(ContentPageActions.updateContentPageFailure({ error })))
        )
      )
    )
  );

  removeContentPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContentPageActions.removeContentPage),
      mergeMap(({ id }) =>
        this.contentPageService.deleteContentPage(id).pipe(
          map(() => ContentPageActions.removeContentPageSuccess()),
          catchError(error => of(ContentPageActions.removeContentPageFailure({ error })))
        )
      )
    )
  );
}
