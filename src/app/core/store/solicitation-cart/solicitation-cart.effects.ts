import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as SolicitationCartActions from './solicitation-cart.actions';
import { CartService } from '../../http/cart.service'; 
import { IResponseError } from '../../models/models.index'; 
import { ISolicitationCartItem } from '../../models/models.index'; 

@Injectable()
export class SolicitationCartEffects {
  private actions$ = inject(Actions);
  private cartService = inject(CartService);

  /**
   * Carregar todos os itens do carrinho
   * -> Chama getCart() para obter um array de ISolicitationCartItem
   */
  loadAllSolicitationCartItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SolicitationCartActions.loadAllSolicitationCartItems),
      tap(() => console.log('[Effects] Handling loadAllSolicitationCartItems')),
      mergeMap(() =>
        this.cartService.getCart().pipe(
          tap((items) => console.log('[Effects] getCart() success:', items)),
          map((items: any) =>
            SolicitationCartActions.loadAllSolicitationCartItemsSuccess({ items })
          ),
          catchError((error: IResponseError) => {
            console.error('[Effects] Error in getCart:', error);
            return of(SolicitationCartActions.loadAllSolicitationCartItemsFailure({ error }));
          })
        )
      )
    )
  );

  /**
   * Adicionar um item ao carrinho
   * -> Chama addItem(...) e retorna o array atualizado de ISolicitationCartItem
   */
  addSolicitationCartItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SolicitationCartActions.addSolicitationCartItem),
      tap((action) => console.log('[Effects] Handling addSolicitationCartItem:', action.item)),
      mergeMap((action) =>
        this.cartService.addItem(action.item).pipe(
          tap((items) => console.log('[Effects] addItem() success:', items)),
          map((items: any) =>
            SolicitationCartActions.addSolicitationCartItemSuccess(items as any)
          ),
          catchError((error: IResponseError) => {
            console.error('[Effects] Error in addItem:', error);
            return of(SolicitationCartActions.addSolicitationCartItemFailure({ error }));
          })
        )
      )
    )
  );

  /**
   * Atualizar um item (por ex., quantidade) no carrinho
   * -> Chama updateItem(...) e retorna o array atualizado de ISolicitationCartItem
   */
  updateSolicitationCartItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SolicitationCartActions.updateSolicitationCartItem),
      tap((action) =>
        console.log(`[Effects] Handling updateSolicitationCartItem for id: ${action.id}`, action.data)
      ),
      mergeMap((action) =>
        // Ajuste a propriedade que você envia. Exemplo: action.data pode ter quantity
        this.cartService.updateItem(action.id, action.data._id as any).pipe(
          tap((items) => console.log('[Effects] updateItem() success:', items)),
          map((items: any[]) =>
            SolicitationCartActions.updateSolicitationCartItemSuccess(items as any)
          ),
          catchError((error: IResponseError) => {
            console.error('[Effects] Error in updateItem:', error);
            return of(SolicitationCartActions.updateSolicitationCartItemFailure({ error }));
          })
        )
      )
    )
  );

  /**
   * Remover um item do carrinho
   * -> Chama removeItem(id) e retorna o array atualizado de ISolicitationCartItem
   */
  removeSolicitationCartItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SolicitationCartActions.removeSolicitationCartItem),
      tap((action) => console.log(`[Effects] Handling removeSolicitationCartItem for id: ${action.id}`)),
      mergeMap((action) =>
        this.cartService.removeItem(action.id).pipe(
          tap((items) => console.log('[Effects] removeItem() success:', items)),
          map((items: any[]) =>
            SolicitationCartActions.removeSolicitationCartItemSuccess(items as any)
          ),
          catchError((error: IResponseError) => {
            console.error('[Effects] Error in removeItem:', error);
            return of(SolicitationCartActions.removeSolicitationCartItemFailure({ error }));
          })
        )
      )
    )
  );

  /**
   * Limpar todo o carrinho
   * -> Chama clearCart() que retorna array vazio (ou array atualizado de ISolicitationCartItem)
   */
  clearSolicitationCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SolicitationCartActions.clearSolicitationCart),
      tap(() => console.log('[Effects] Handling clearSolicitationCart')),
      mergeMap(() =>
        this.cartService.clearCart().pipe(
          tap((items) => console.log('[Effects] clearCart() success:', items)),
          map((items: any[]) =>
            SolicitationCartActions.clearSolicitationCartSuccess()
          ),
          catchError((error: IResponseError) => {
            console.error('[Effects] Error in clearCart:', error);
            return of(SolicitationCartActions.clearSolicitationCartFailure({ error }));
          })
        )
      )
    )
  );

  /**
   * (Opcional) Carregar item específico por ID
   * -> Somente se houver método no CartService, por ex.: getItemById(id).
   * Se não existir, comente ou remova esse trecho.
   */
  /*
  loadSolicitationCartItemById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SolicitationCartActions.loadSolicitationCartItemById),
      tap(action => console.log(`[Effects] Handling loadSolicitationCartItemById for id: ${action.id}`)),
      switchMap((action) =>
        this.cartService.getItemById(action.id).pipe(
          tap(item => console.log('[Effects] getItemById() success:', item)),
          map((item: ISolicitationCartItem) =>
            SolicitationCartActions.loadSolicitationCartItemByIdSuccess({ item })
          ),
          catchError((error: IResponseError) => {
            console.error(`[Effects] Error in getItemById for id ${action.id}:`, error);
            return of(SolicitationCartActions.loadSolicitationCartItemByIdFailure({ error }));
          })
        )
      )
    )
  );
  */
}
