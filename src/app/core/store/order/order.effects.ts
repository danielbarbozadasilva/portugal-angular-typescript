import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { OrderService } from '../../http/order.service';
import * as OrderActions from './order.actions';
import { IResponseError, IOrder } from '../../models/models.index';

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
        // Assumindo que getAllOrders retorna IOrder[] diretamente após o map no service
        this.orderService.getAllOrders().pipe(
          map((orders) => OrderActions.loadOrdersSuccess({ orders })), // Ajustar se o service retornar PaginatedOrdersResponse
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
          map((order: IOrder) => OrderActions.loadOrderByIdSuccess({ order })),
          catchError((error: IResponseError) => of(OrderActions.loadOrderByIdFailure({ error })))
        )
      )
    )
  );

  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.createOrder),
      mergeMap((action) =>
        this.orderService.createOrder(action.data).pipe(
          map((order: IOrder) => OrderActions.createOrderSuccess({ order })),
          catchError((error: IResponseError) => of(OrderActions.createOrderFailure({ error })))
        )
      )
    )
  );

  updateOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.updateOrder),
      mergeMap((action) =>
        this.orderService.updateOrder(action.id, action.data).pipe(
          map((order: IOrder) => OrderActions.updateOrderSuccess({ order })), // Passa o pedido atualizado
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
          map(({ id }) => OrderActions.removeOrderSuccess({ id })), // Passa o ID retornado pelo serviço
          catchError((error: IResponseError) => of(OrderActions.removeOrderFailure({ error })))
        )
      )
    )
  );
}
