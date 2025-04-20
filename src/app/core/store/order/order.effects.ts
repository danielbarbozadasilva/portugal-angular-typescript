import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {OrderService} from '../../../core/http/order.service';
import * as OrderActions from './order.actions';
import { mergeMap, map, catchError, of } from 'rxjs';

@Injectable()
export class OrderEffects {
  constructor(
    private actions$: Actions,
    private orderService: OrderService
  ) {}

  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.loadOrders),
      mergeMap(() =>
        this.orderService.getAllOrders().pipe(
          map(orders => OrderActions.loadOrdersSuccess({ orders })),
          catchError(error => of(OrderActions.loadOrdersFailure({ error })))
        )
      )
    )
  );

  loadOrderById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.loadOrderById),
      mergeMap(({ id }) =>
        this.orderService.getOrder(id).pipe(
          map(order => OrderActions.loadOrderByIdSuccess({ order })),
          catchError(error => of(OrderActions.loadOrderByIdFailure({ error })))
        )
      )
    )
  );

  updateOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.updateOrder),
      mergeMap(({ id, data }) =>
        this.orderService.updateOrder(id, data).pipe(
          map(() => OrderActions.updateOrderSuccess()),
          catchError(error => of(OrderActions.updateOrderFailure({ error })))
        )
      )
    )
  );

  removeOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.removeOrder),
      mergeMap(({ id }) =>
        this.orderService.deleteOrder(id).pipe(
          map(() => OrderActions.removeOrderSuccess()),
          catchError(error => of(OrderActions.removeOrderFailure({ error })))
        )
      )
    )
  );
}
