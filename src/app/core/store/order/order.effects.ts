import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { OrderService } from '../../http/order.service'; // Correct path
import * as OrderActions from './order.actions';
import { IResponseError } from '../../models/models.index';

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
          map((orders) => OrderActions.loadOrdersSuccess({ orders })),
          catchError((error: IResponseError) => of(OrderActions.loadOrdersFailure({ error })))
        )
      )
    )
  );

  loadOrderById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.loadOrderById),
      switchMap((action) =>
        this.orderService.getOrderById(action.id).pipe(
          map((order) => OrderActions.loadOrderByIdSuccess({ order })),
          catchError((error: IResponseError) => of(OrderActions.loadOrderByIdFailure({ error })))
        )
      )
    )
  );

  updateOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.updateOrder),
      mergeMap((action) =>
        this.orderService.updateOrder(action.id, action.data).pipe(
          // Assuming success action doesn't need the updated order
          map(() => OrderActions.updateOrderSuccess()),
          catchError((error: IResponseError) => of(OrderActions.updateOrderFailure({ error })))
        )
      )
    )
  );

  removeOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.removeOrder),
      mergeMap((action) =>
        this.orderService.removeOrder(action.id).pipe(
          // Assuming success action doesn't need the id
          map(() => OrderActions.removeOrderSuccess()),
          catchError((error: IResponseError) => of(OrderActions.removeOrderFailure({ error })))
        )
      )
    )
  );

  // Add create effect if create action/service method exists
  // createOrder$ = createEffect(() => ... );
}
