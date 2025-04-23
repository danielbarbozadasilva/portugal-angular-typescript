import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SolicitationCartService } from '../../../core/http/solicitationsCartItem.service';
import * as SolicitationCartActions from './solicitation-cart.actions';
import { mergeMap, map, catchError, of } from 'rxjs';

@Injectable()
export class SolicitationCartEffects {
  constructor(
    private actions$: Actions,
    private solicitationCartService: SolicitationCartService
  ) { }

  loadAllItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SolicitationCartActions.loadAllSolicitationCartItems),
      mergeMap(() =>
        this.solicitationCartService.getAllSolicitationsCartItem().pipe(
          map((items) => SolicitationCartActions.loadAllSolicitationCartItemsSuccess({ items })),
          catchError((error) => of(SolicitationCartActions.loadAllSolicitationCartItemsFailure({ error })))
        )
      )
    )
  );

  loadItemById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SolicitationCartActions.loadSolicitationCartItemById),
      mergeMap(({ id }) =>
        this.solicitationCartService.getSolicitationCartItem(id).pipe(
          map((item) => SolicitationCartActions.loadSolicitationCartItemByIdSuccess({ item })),
          catchError((error) => of(SolicitationCartActions.loadSolicitationCartItemByIdFailure({ error })))
        )
      )
    )
  );

  updateItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SolicitationCartActions.updateSolicitationCartItem),
      mergeMap(({ id, data }) =>
        this.solicitationCartService.updateSolicitationCartItem(id, data).pipe(
          map(() => SolicitationCartActions.updateSolicitationCartItemSuccess()),
          catchError((error) => of(SolicitationCartActions.updateSolicitationCartItemFailure({ error })))
        )
      )
    )
  );

  removeItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SolicitationCartActions.removeSolicitationCartItem),
      mergeMap(({ id }) =>
        this.solicitationCartService.deleteSolicitationCartItem(id).pipe(
          map(() => SolicitationCartActions.removeSolicitationCartItemSuccess()),
          catchError((error) => of(SolicitationCartActions.removeSolicitationCartItemFailure({ error })))
        )
      )
    )
  );
}
