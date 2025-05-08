// src/app/core/store/cart/cart.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as CartActions from './cart.actions';
import { CartService } from '../../http/cart.service'; 
import { IResponseError } from '../../models/models.index';

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private cartService: CartService
  ) {}
  
  addItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addItem),
      mergeMap(({ item }) =>
        this.cartService.addItem(item).pipe(
          // Se der certo, você pode disparar outra action de sucesso ou atualizar o state
          map((updatedCart) => {
            // Retorne uma action de sucesso se quiser manipular o reducer
            return {
              type: '[Cart API] Add Item Success',
              payload: updatedCart 
            };
          }),
          // Se der erro, despache uma action de falha
          catchError((error: IResponseError) => {
            const errorMsg = error?.message || 'Erro ao adicionar item ao carrinho.';
            return of({ type: '[Cart API] Add Item Failure', error: errorMsg });
          })
        )
      )
    )
  );

  /**
   * Exemplo de side effect para limpar o carrinho
   * Caso queira chamar o back-end ao limpar.
   */
  clearCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.clearCart),
      mergeMap(() =>
        this.cartService.clearCart().pipe(
          map((emptyCart) => ({ 
            type: '[Cart API] Clear Cart Success', 
            payload: emptyCart 
          })),
          catchError((error: IResponseError) => {
            const errorMsg = error?.message || 'Erro ao limpar o carrinho.';
            return of({ type: '[Cart API] Clear Cart Failure', error: errorMsg });
          })
        )
      )
    )
  );
}
